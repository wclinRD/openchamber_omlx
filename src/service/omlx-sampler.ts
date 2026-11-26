// Polls /admin/api/activity and transforms the raw oMLX structure into our
// snapshot types, maintaining history for charts.

import type { OmlxActivityModel, OmlxActivityStats } from '../shared/snapshot.ts';
import type { OmlxApi } from './omlx-api.ts';
import type { OmlxModelStatus, OmlxSnapshotSummary, Snapshot, SnapshotPoint, Warning } from '../shared/snapshot.ts';
import { HISTORY_POINTS } from '../shared/snapshot.ts';

const SAMPLE_INTERVAL_MS = 2_000;

export class OmlxSampler {
  private api: OmlxApi;
  private history: SnapshotPoint[] = [];
  private lastStats: OmlxActivityStats | null = null;
  private running = false;
  private timer: NodeJS.Timeout | null = null;

  constructor(api: OmlxApi) {
    this.api = api;
  }

  public getHistory(): SnapshotPoint[] {
    return this.history;
  }

  public async snapshot(): Promise<Snapshot> {
    if (!this.lastStats) {
      await this.sample();
    }
    const at = Date.now();
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
      history: [...this.history],
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
