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
  AppStats,
} from '../shared/snapshot.ts';
import type { OmlxApi } from './omlx-api.ts';
import { HISTORY_POINTS } from '../shared/snapshot.ts';

export interface RawProcess {
  pid: number;
  ppid: number;
  name: string;
  /** Resident memory in bytes. */
  memory: number;
  /** User plus system CPU time since the process started, in seconds. */
  cpuSeconds: number;
  /** Start time in ms since the epoch, where the OS reuses parent pids (Windows). */
  startedAt?: number;
  /** Controlling terminal (`ttys004`, a Linux tty number); absent without one or on Windows. */
  tty?: string;
}

const SAMPLE_INTERVAL_MS = 2_000;
/** System resources sampled less frequently than oMLX activity to avoid jitter. */
const SYSTEM_SAMPLE_INTERVAL_MS = 5_000;

interface NetworkStats { tx: number; rx: number }
interface CpuTimes { idle: number; total: number }

const toInt = (value: string | undefined): number => {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
};

const parseVmStatUsed = (stdout: string): number | null => {
  const pageSize = toInt(/page size of (\d+) bytes/.exec(stdout)?.[1]);
  const pages = (label: string): number => {
    const match = new RegExp(`^${label}:\\s+(\\d+)`, 'm').exec(stdout);
    return toInt(match?.[1]);
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
  const read = (label: string): number => toInt(new RegExp(`^${label}:\\s+(\\d+) kB`, 'm').exec(content)?.[1]) * 1024;
  const total = read('MemTotal');
  const available = read('MemAvailable');
  return Number.isFinite(total) && Number.isFinite(available) ? Math.max(0, total - available) : null;
};

const parseCpuTime = (value: string): number => {
  const [daysPart, clock] = value.includes('-') ? value.split('-', 2) : ['0', value];
  const parts = (clock ?? '').split(':').map(Number);
  if (parts.some((part) => !Number.isFinite(part))) return Number.NaN;
  let seconds = 0;
  for (const part of parts) seconds = seconds * 60 + part;
  return Number(daysPart) * 86_400 + seconds;
};

const basename = (path: string): string => {
  const trimmed = path.trim();
  const slash = Math.max(trimmed.lastIndexOf('/'), trimmed.lastIndexOf('\\'));
  return slash >= 0 ? trimmed.slice(slash + 1) : trimmed;
};

const parsePsList = (stdout: string): RawProcess[] => {
  const rows: RawProcess[] = [];
  for (const line of stdout.split('\n')) {
    const match = /^\s*(\d+)\s+(\d+)\s+(\d+)\s+(\S+)\s+(\S+)\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const pid = toInt(match[1]);
    const ppid = toInt(match[2]);
    const rssKb = toInt(match[3]);
    const cpuSeconds = parseCpuTime(match[4] ?? '');
    if (!Number.isFinite(pid) || !Number.isFinite(ppid)) continue;
    const tty = match[5] ?? '??';
    rows.push({
      pid,
      ppid,
      name: basename(match[6] ?? ''),
      memory: Number.isFinite(rssKb) ? rssKb * 1024 : 0,
      cpuSeconds: Number.isFinite(cpuSeconds) ? cpuSeconds : 0,
      ...(tty === '??' || tty === '-' ? {} : { tty }),
    });
  }
  return rows;
};

const run = (file: string, args: string[], okExitCodes: number[] = [0]): Promise<string> =>
  new Promise((resolve, reject) => {
    import('node:child_process').then(({ execFile }) => {
      execFile(file, args, { timeout: 10_000, maxBuffer: 16 * 1024 * 1024, windowsHide: true }, (error, stdout) => {
        const code = error && 'code' in error && typeof error.code === 'number' ? error.code : error ? -1 : 0;
        if (!error || okExitCodes.includes(code)) resolve(stdout);
        else reject(error);
      });
    });
  });

const parsePsListSync = (stdout: string): RawProcess[] => {
  const rows: RawProcess[] = [];
  for (const line of stdout.split('\n')) {
    const match = /^\s*(\d+)\s+(\d+)\s+(\d+)\s+(\S+)\s+(\S+)\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const pid = toInt(match[1]);
    const ppid = toInt(match[2]);
    const rssKb = toInt(match[3]);
    const cpuSeconds = parseCpuTime(match[4] ?? '');
    if (!Number.isFinite(pid) || !Number.isFinite(ppid)) continue;
    const tty = match[5] ?? '??';
    rows.push({
      pid,
      ppid,
      name: basename(match[6] ?? ''),
      memory: Number.isFinite(rssKb) ? rssKb * 1024 : 0,
      cpuSeconds: Number.isFinite(cpuSeconds) ? cpuSeconds : 0,
      ...(tty === '??' || tty === '-' ? {} : { tty }),
    });
  }
  return rows;
};

export class OmlxSampler {
  private api: OmlxApi;
  private history: SnapshotPoint[] = [];
  private systemHistory: Series = { cpu: [], memory: [] };
  private appHistory: Series = { cpu: [], memory: [] };
  private lastAppStats: AppStats | null = null;
  private previousCores: CpuTimes[] | null = null;
  private previousCpu: Map<number, { seconds: number; name: string }> = new Map();
  private previousAt = 0;
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

  private childrenOf = (processes: readonly RawProcess[]): Map<number, RawProcess[]> => {
    const children = new Map<number, RawProcess[]>();
    for (const process of processes) {
      if (process.pid === process.ppid) continue;
      const list = children.get(process.ppid) ?? [];
      list.push(process);
      children.set(process.ppid, list);
    }
    return children;
  };

  private collectTree = (processes: readonly RawProcess[], rootPid: number, selfPid: number): Map<number, RawProcess> => {
    const byPid = new Map(processes.map((process) => [process.pid, process]));
    const children = this.childrenOf(processes);
    const members = new Map<number, RawProcess>();
    const root = byPid.get(rootPid);
    if (!root) return members;
    const stack: RawProcess[] = [root];
    while (stack.length > 0) {
      const process = stack.pop();
      if (!process || members.has(process.pid)) continue;
      members.set(process.pid, process);
      if (process.pid === selfPid) continue;
      for (const child of children.get(process.pid) ?? []) {
        const { startedAt: childStart } = child;
        const { startedAt: parentStart } = process;
        if (childStart !== undefined && parentStart !== undefined && childStart < parentStart) continue;
        stack.push(child);
      }
    }
    return members;
  };

  private cpuFromProcesses = (processes: readonly RawProcess[], at: number, cores: number): Map<number, Percent | null> => {
    const elapsed = (at - this.previousAt) / 1000;
    const cpu = new Map<number, Percent | null>();
    const next = new Map<number, { seconds: number; name: string }>();
    for (const process of processes) {
      next.set(process.pid, { seconds: process.cpuSeconds, name: process.name });
      const previous = this.previousCpu.get(process.pid);
      if (!previous || previous.name !== process.name || this.previousAt === 0 || elapsed <= 0) {
        cpu.set(process.pid, null);
        continue;
      }
      const used = Math.max(0, process.cpuSeconds - previous.seconds);
      cpu.set(process.pid, Math.min(100 * cores, (100 * used) / elapsed));
    }
    this.previousCpu = next;
    this.previousAt = at;
    return cpu;
  };

  private computeAppStats = async (processes: readonly RawProcess[], at: number): Promise<AppStats> => {
    const cores = Math.max(1, os.cpus().length);
    const rootPid = process.ppid; // OpenChapper main process (service's parent)
    const selfPid = process.pid;
    const cpu = this.cpuFromProcesses(processes, at, cores);
    const members = this.collectTree(processes, rootPid, selfPid);
    let totalCpu: Percent = 0;
    let totalMemory = 0;
    for (const [pid, process] of members) {
      const cpuPct = cpu.get(pid) ?? 0;
      if (Number.isFinite(cpuPct)) totalCpu += cpuPct;
      totalMemory += process.memory;
    }
    const rootName = members.get(rootPid)?.name ?? 'OpenChamber';
    return { rootPid, rootName, cpu: totalCpu, memory: totalMemory };
  };

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
      let appStats: AppStats | null = null;
      try {
        const processes = parsePsListSync(execSync('ps -A -o pid=,ppid=,rss=,cputime=,tty=,comm=', { encoding: 'utf8' }));
        appStats = await this.computeAppStats(processes, at);
        this.pushSeries(this.appHistory.cpu, appStats.cpu);
        this.pushSeries(this.appHistory.memory, appStats.memory);
      } catch {
        // A failed process read is not "OpenChamber uses nothing": keep the last view and
        // previous CPU times, so neither the chart nor the next reading drops to zero.
        const last = this.lastAppStats ?? { rootPid: process.ppid, rootName: 'OpenChamber', cpu: 0, memory: 0 };
        appStats = last;
      }
      if (!appStats) appStats = { rootPid: process.ppid, rootName: 'OpenChamber', cpu: 0, memory: 0 };
      this.lastAppStats = appStats;
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
      app: this.lastAppStats ?? { rootPid: process.ppid, rootName: 'OpenChamber', cpu: 0, memory: 0 },
      history: {
        omlx: [...this.history],
        system: {
          cpu: [...this.systemHistory.cpu],
          memory: [...this.systemHistory.memory],
        },
        app: {
          cpu: [...this.appHistory.cpu],
          memory: [...this.appHistory.memory],
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
