// The one answer the service gives: `GET /snapshot`. The panel and the Work
// Status section both read it, so the shape lives here and nowhere else.

/** Points of history the service keeps: three minutes at one sample every two seconds. */
export const HISTORY_POINTS = 90;

/** Number of CPUs / number of cores; CPU time percentages count 100 per core. */
export type Percent = number;

export interface Series {
  /** Oldest first, one point per sample. */
  cpu: Percent[];
  memory: number[];
}

/** System-level resource readings collected by the sampler. */
export interface SystemStats {
  hostname: string;
  platform: string; // process.platform
  release: string;
  arch: string;
  cpuModel: string;
  cores: number;
  cpu: Percent | null; // overall system CPU, 0..100
  /** 1, 5 and 15 minute load; null on Windows. */
  load: [number, number, number] | null;
  memoryTotal: number;
  memoryUsed: number;
  uptimeSeconds: number;
  /** Upload speed in bytes per second. */
  networkSpeedUp: number;
  /** Download speed in bytes per second. */
  networkSpeedDown: number;
}

/** oMLX `/admin/api/activity` model object shape (actual fields). */
export interface OmlxActivityModel {
  id: string;
  estimated_size: number;
  estimated_size_formatted: string;
  actual_size: number;
  actual_size_formatted: string;
  pinned: boolean;
  is_loading: boolean;
  loading_elapsed_seconds: number | null;
  loading_estimated_seconds: number | null;
  loading_remaining_seconds_estimate: number | null;
  active_requests: number;
  waiting_requests: number;
  waiting: OmlxWaitingStatus[];
  activities: OmlxRequestStatus[];
  prefilling: OmlxRequestStatus[];
  generating: OmlxRequestStatus[];
  idle_seconds: number;
  ttl_remaining_seconds: number | null;
  cluster: unknown;
}

export interface OmlxRequestStatus {
  request_id: string;
  elapsed_seconds: number | null;
  processed: number | null;
  total: number | null;
  generated_tokens: number | null;
  tokens_per_second: number | null;
  speed: number | null;
  eta: number | null;
  phase: string;
  detail: Record<string, unknown> | null;
  prompt_tokens: number | null;
  max_tokens: number | null;
}

export interface OmlxWaitingStatus {
  request_id: string;
  queue_position: number;
  elapsed_seconds: number;
  prompt_tokens: number;
}

export interface OmlxActivityStats {
  active_models: {
    models: OmlxActivityModel[];
    model_memory_used: number;
    model_memory_max: number;
    memory_pressure: {
      enabled: boolean;
      current_bytes: number;
      soft_bytes: number;
      hard_bytes: number;
      current_formatted: string;
      soft_formatted: string;
      hard_formatted: string;
      pressure_level: string;
    };
    total_active_requests: number;
    total_waiting_requests: number;
  };
}

/** Internal normalized model status for the snapshot. */
export interface OmlxModelStatus {
  id: string;
  loaded: boolean;
  state: 'loaded' | 'unloaded' | 'loading' | 'error';
  memory_used: number;
  prefilling: OmlxRequestStatus[];
  generating: OmlxRequestStatus[];
  waiting: OmlxWaitingStatus[];
  total_active_requests: number;
  total_waiting_requests: number;
}

export interface OmlxSnapshotSummary {
  total_prefilling: number;
  total_generating: number;
  total_waiting: number;
  total_active_requests: number;
  total_waiting_requests: number;
  models_loaded: number;
}

export interface OmlxServerStatus {
  host: string;
  port: number;
  authenticated: boolean;
  active_models: OmlxModelStatus[];
  summary: OmlxSnapshotSummary;
  memory_pressure?: {
    enabled: boolean;
    current_bytes: number;
    soft_bytes: number;
    hard_bytes: number;
    current_formatted: string;
    soft_formatted: string;
    hard_formatted: string;
    pressure_level: string;
  };
}

export interface Warning {
  code: string;
  message: string;
}

export interface Snapshot {
  at: number;
  intervalMs: number;
  omlx: OmlxServerStatus;
  system: SystemStats;
  history: {
    omlx: SnapshotPoint[];
    system: Series;
  };
  warnings: Warning[];
}

export interface SnapshotPoint {
  at: number;
  prefilling: number;
  generating: number;
  waiting: number;
  active_requests: number;
  waiting_requests: number;
}

export type OmlxEventKind =
  | 'prefill-progress'
  | 'generate-tokens'
  | 'chat-start'
  | 'chat-end'
  | 'model-load'
  | 'model-unload'
  | 'model-error'
  | 'activity-reset';

export interface OmlxEvent {
  kind: OmlxEventKind;
  at: number;
  model_id: string | null;
  request_id: string | null;
  data: Record<string, unknown>;
}
