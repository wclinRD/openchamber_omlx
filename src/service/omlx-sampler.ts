// Polls /admin/api/activity and transforms the raw oMLX structure into our
// snapshot types, maintaining history for charts. Also collects system resource
// readings (CPU, memory, network) like lmstudio_monitor.

import os from 'node:os';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

import type {
  OmlxActivityModel,
  OmlxActivityStats,
  OmlxModelStatus,
  OmlxSnapshotSummary,
  Series,
  Snapshot,
  SnapshotPoint,
  SystemStats,
  Warning,
  Percent,
} from '../shared/snapshot.ts';
import type { OmlxApi } from './omlx-api.ts';
import { HISTORY_POINTS } from '../shared/snapshot.ts';

const SAMPLE_INTERVAL_MS = 2_000;
/** System resources sampled less frequently than oMLX activity to avoid jitter. */
const SYSTEM_SAMPLE_INTERVAL_MS = 5_000;

interface NetworkStats { tx: number; rx: number }
interface CpuTimes { idle: number; total: number }

const parseVmStatUsed = (stdout: string): number | null => {
  const pageSizeMatch = /^page size of (\d+) bytes/m.exec(stdout);
  const pageSize = pageSizeMatch && pageSizeMatch[1] ? Number.parseInt(pageSizeMatch[1], 10) : Number.NaN;
  const pages = (label: string): number => {
    const match = new RegExp(`^${label}:\\s+(\\d+)`, 'm').exec(stdout);
    return match && match[1] ? Number.parseInt(match[1], 10) : Number.NaN;
  };
  const anonymous = pages('Anonymous pages');
  const purgeable = pages('Pages purgeable');
  const wired = pages('Pages wired down');
  const compressed = pages('Pages occupied by compressor');
  const values = [pageSize, anonymous, wired, compressed];
  if (values.some((value) => !Number.isFinite(value))) return null;
  const app = Math.max(0, anonymous - (Number.isFinite(purgeable) ? purgeable : 0));
  return (app + wired + compressed) * pageSize;
};

const parseMeminfoUsed = (content: string): number | null => {
  const read = (label: string): number => {
    const match = new RegExp(`^${label}:\\s+(\\d+) kB`, 'm').exec(content);
    return match && match[1] ? Number.parseInt(match[1], 10) * 1024 : Number.NaN;
  };
  const total = read('MemTotal');
  const available = read('MemAvailable');
  if (!Number.isFinite(total) || !Number.isFinite(available)) return null;
  return Math.max(0, total - available);
};

export class OmlxSampler {
  private api: OmlxApi;
  private history: SnapshotPoint[] = [];
  private systemHistory: Series = { cpu: [], memory: [] };
  private previousCores: CpuTimes[] | null = null;
  private previousNetworkStats: NetworkStats | null = null;
  private previousNetworkAt = 0;
  private lastSystemStats: SystemStats | null = null;
  private systemLastSampleAt = 0;
  private lastStats: OmlxActivityStats | null = null;
  private running = false;
  private timer: NodeJS.Timeout | null = null;

  constructor(api: OmlxApi) {
    this.api = api;
  }

  public getHistory(): SnapshotPoint[] {
    return this.history;
  }

  /** Read system CPU as an overall percentage across all cores. */
  private systemCpu(): Percent | null {
    const now = os.cpus().map(({ times }) => ({
      idle: times.idle,
      total: times.user + times.nice + times.sys + times.idle + times.irq,
    }));
    const before = this.previousCores;
    this.previousCores = now;
    if (!before || before.length !== now.length) return null;
    let idle = 0;
    let total = 0;
    now.forEach((core, index) => {
      const previous = before[index];
      if (!previous) return;
      idle += core.idle - previous.idle;
      total += core.total - previous.total;
    });
    if (total === 0) return null;
    const pct = 100 * (1 - idle / total);
    return Math.min(100, Math.max(0, pct));
  }

  private readNetworkStats(): { tx: number; rx: number } {
    const platform = process.platform;
    if (platform === 'darwin') {
      try {
        const output = execSync('netstat -ib', { encoding: 'utf8' });
        let tx = 0;
        let rx = 0;
        let currentName: string | null = null;
        for (const line of output.split('\n')) {
          if (/^Name/.test(line)) continue;
          const parts = line.split(/\s+/).filter(Boolean);
          if (parts.length < 10) continue;
          const isLinkRow = line.includes('<Link#');
          if (isLinkRow) {
            const match = line.match(/^(\S+)\s/);
            currentName = match ? match[1] || null : null;
            if (!currentName) continue;
          }
          if (!currentName || currentName === 'lo0') continue;
          let ibytes: number;
          let obytes: number;
          if (parts.length === 10) {
            ibytes = Number(parts[5]);
            obytes = Number(parts[8]);
          } else {
            ibytes = Number(parts[6]);
            obytes = Number(parts[9]);
          }
          if (!Number.isNaN(ibytes) && !Number.isNaN(obytes)) {
            rx += ibytes;
            tx += obytes;
          }
        }
        return { tx, rx };
      } catch {
        return { tx: 0, rx: 0 };
      }
    }
    if (platform === 'linux') {
      try {
        const text = readFileSync('/proc/net/dev', 'utf8');
        let tx = 0;
        let rx = 0;
        for (const line of text.split('\n')) {
          if (/^Inter-|^face/.test(line)) continue;
          const match = line.match(/^(\S+):\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+).*$/);
          if (!match) continue;
          const name = match[1]!.replace(':', '');
          if (name === 'lo') continue;
          const r = Number(match[2]!);
          const t = Number(match[10]!);
          if (!Number.isNaN(r) && !Number.isNaN(t)) {
            rx += r;
            tx += t;
          }
        }
        return { tx, rx };
      } catch {
        return { tx: 0, rx: 0 };
      }
    }
    return { tx: 0, rx: 0 };
  }

  private networkThroughput(): { up: number; down: number } {
    const nowAt = Date.now();
    const currentBytes = this.readNetworkStats();
    let up = 0;
    let down = 0;
    if (this.previousNetworkStats && this.previousNetworkAt > 0) {
      const elapsed = (nowAt - this.previousNetworkAt) / 1000;
      if (elapsed > 0) {
        const deltaSent = currentBytes.tx - this.previousNetworkStats.tx;
        const deltaReceived = currentBytes.rx - this.previousNetworkStats.rx;
        if (deltaSent > 0) up = Math.max(0, deltaSent / elapsed);
        if (deltaReceived > 0) down = Math.max(0, deltaReceived / elapsed);
      }
    }
    this.previousNetworkAt = nowAt;
    this.previousNetworkStats = currentBytes;
    return { up, down };
  }

  private pushSeries(series: number[], value: number): void {
    series.push(value);
    if (series.length > HISTORY_POINTS) series.splice(0, series.length - HISTORY_POINTS);
  }

  private systemStats(): SystemStats {
    const systemCpu = this.systemCpu();
    let memoryUsed: number;
    try {
      if (process.platform === 'darwin') {
        const vmStat = execSync('vm_stat', { encoding: 'utf8' });
        const used = parseVmStatUsed(vmStat);
        if (used !== null) memoryUsed = used;
        else memoryUsed = os.totalmem() - os.freemem();
      } else if (process.platform === 'linux') {
        const meminfo = readFileSync('/proc/meminfo', 'utf8');
        const used = parseMeminfoUsed(meminfo);
        if (used !== null) memoryUsed = used;
        else memoryUsed = os.totalmem() - os.freemem();
      } else {
        memoryUsed = os.totalmem() - os.freemem();
      }
    } catch {
      memoryUsed = os.totalmem() - os.freemem();
    }

    const load = os.loadavg();
    const firstCpu = os.cpus()[0];

    const throughput = this.networkThroughput();
    return {
      hostname: os.hostname(),
      platform: process.platform,
      release: os.release(),
      arch: os.arch(),
      cpuModel: firstCpu?.model.trim() ?? '',
      cores: Math.max(1, os.cpus().length),
      cpu: systemCpu,
      load: process.platform === 'win32' ? null : [load[0] ?? 0, load[1] ?? 0, load[2] ?? 0],
      memoryTotal: os.totalmem(),
      memoryUsed,
      uptimeSeconds: os.uptime(),
      networkSpeedUp: throughput.up,
      networkSpeedDown: throughput.down,
    };
  }

  public async snapshot(): Promise<Snapshot> {
    if (!this.lastStats) {
      await this.sample();
    }
    const at = Date.now();
    const shouldSampleSystem = !this.systemLastSampleAt || (at - this.systemLastSampleAt) >= SYSTEM_SAMPLE_INTERVAL_MS;

    let system: SystemStats;
    if (shouldSampleSystem) {
      system = this.systemStats();
      this.systemLastSampleAt = at;
      this.lastSystemStats = system;
    } else {
      system = this.lastSystemStats ?? this.systemStats();
    }

    const rawModels = this.lastStats?.active_models?.models ?? [];
    const summary = this.lastStats
      ? this.computeSummary(this.transformModels(rawModels))
      : { total_prefilling: 0, total_generating: 0, total_waiting: 0, total_active_requests: 0, total_waiting_requests: 0, models_loaded: 0 };
    const point: SnapshotPoint = {
      at,
      prefilling: summary.total_prefilling,
      generating: summary.total_generating,
      waiting: summary.total_waiting,
      active_requests: summary.total_active_requests,
      waiting_requests: summary.total_waiting_requests,
    };
    this.history.push(point);
    if (this.history.length > HISTORY_POINTS) this.history.shift();

    // Points without a CPU reading yet would draw a false zero.
    if (shouldSampleSystem && system.cpu !== null) {
      this.pushSeries(this.systemHistory.cpu, system.cpu);
      this.pushSeries(this.systemHistory.memory, system.memoryUsed);
    }

    const warnings: Warning[] = [];
    if (this.api.authError) {
      warnings.push({ code: 'AUTH_ERROR', message: 'oMLX Admin API authentication failed (API key mismatch)' });
    } else if (!rawModels || rawModels.length === 0) {
      warnings.push({ code: 'NO_MODELS', message: 'No models found on oMLX server' });
    }

    return {
      at,
      intervalMs: SAMPLE_INTERVAL_MS,
      omlx: {
        host: this.api.host,
        port: this.api.port,
        authenticated: !this.api.authError,
        active_models: this.lastStats ? this.transformModels(rawModels) : [],
        summary,
        memory_pressure: this.lastStats?.active_models?.memory_pressure,
      },
      system,
      history: {
        omlx: [...this.history],
        system: {
          cpu: [...this.systemHistory.cpu],
          memory: [...this.systemHistory.memory],
        },
      },
      warnings,
    };
  }

  public async start(): Promise<void> {
    if (this.running) return;
    this.running = true;
    this.timer = setInterval(() => this.sample(), SAMPLE_INTERVAL_MS);
    await this.sample();
  }

  public stop(): void {
    this.running = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private async sample(): Promise<void> {
    if (!this.running) return;

    try {
      const stats = await this.api.getActivity();
      this.lastStats = stats;

      const rawModels = stats.active_models.models;
      const models = this.transformModels(rawModels);
      const summary = this.computeSummary(models);

      const at = Date.now();
      const historyPoint: SnapshotPoint = {
        at,
        prefilling: summary.total_prefilling,
        generating: summary.total_generating,
        waiting: summary.total_waiting,
        active_requests: summary.total_active_requests,
        waiting_requests: summary.total_waiting_requests,
      };
      this.history.push(historyPoint);
      if (this.history.length > HISTORY_POINTS) {
        this.history.shift();
      }
    } catch {
      const at = Date.now();
      const activeRequests = this.lastStats?.active_models?.total_active_requests ?? 0;
      const waitingRequests = this.lastStats?.active_models?.total_waiting_requests ?? 0;
      const point: SnapshotPoint = {
        at,
        prefilling: activeRequests,
        generating: activeRequests,
        waiting: waitingRequests,
        active_requests: activeRequests,
        waiting_requests: waitingRequests,
      };
      this.history.push(point);
      if (this.history.length > HISTORY_POINTS) {
        this.history.shift();
      }
    }
  }

  private transformModels(raw: OmlxActivityModel[]): OmlxModelStatus[] {
    return raw.map((m) => {
      const modelId = m.id;
      const loaded = m.pinned || m.actual_size > 0;
      let state: OmlxModelStatus['state'] = 'unloaded';
      if (m.is_loading) {
        state = 'loading';
      } else if (m.pinned || m.actual_size > 0) {
        state = 'loaded';
      }

      return {
        id: modelId,
        loaded,
        state,
        memory_used: m.actual_size,
        prefilling: m.prefilling,
        generating: m.generating,
        waiting: m.waiting,
        total_active_requests: m.active_requests || m.prefilling.length + m.generating.length + m.waiting.length,
        total_waiting_requests: m.waiting_requests || m.waiting.length,
      };
    });
  }

  private computeSummary(models: OmlxModelStatus[]): OmlxSnapshotSummary {
    let total_prefilling = 0;
    let total_generating = 0;
    let total_waiting = 0;
    let models_loaded = 0;

    for (const m of models) {
      total_prefilling += m.prefilling.length;
      total_generating += m.generating.length;
      total_waiting += m.waiting.length;
      if (m.loaded) models_loaded++;
    }

    return {
      total_prefilling,
      total_generating,
      total_waiting,
      total_active_requests: total_prefilling + total_generating,
      total_waiting_requests: total_waiting,
      models_loaded,
    };
  }
}
