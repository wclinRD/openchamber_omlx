// Polls the oMLX service while the panel or status section is on screen. A hidden
// section asks nothing, so the service can idle and stop.
import type { HostClient } from '@openchamber/sdk';
import { HostRequestError } from '@openchamber/sdk';

const POLLS_INTERVAL = 2_000;

export type PollFailure = 'needs-approval' | 'paused' | 'service-failed' | 'unreachable' | 'bad-answer';

export const FAILURE_TEXT: Record<PollFailure, string> = {
  'needs-approval': 'Allow the local service for oMLX monitor in Settings → Extensions.',
  paused: 'oMLX monitor is paused in Settings → Extensions.',
  'service-failed': 'The monitoring service stopped. It restarts on the next refresh.',
  unreachable: 'Could not reach the oMLX monitoring service.',
  'bad-answer': 'The monitoring service answered with something unexpected.',
};

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

export interface OmlxRequestStatus {
  request_id: string;
  elapsed_seconds: number | null;
  processed: number | null;
  total: number | null;
  generated_tokens: number | null;
  tokens_per_second: number | null;
  speed: number | null;
  eta: number | null;
}

export interface OmlxWaitingStatus {
  request_id: string;
  queue_position: number;
  elapsed_seconds: number;
  prompt_tokens: number;
}

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

export interface SnapshotPoint {
  at: number;
  prefilling: number;
  generating: number;
  waiting: number;
  active_requests: number;
  waiting_requests: number;
}

export interface Warning {
  code: string;
  message: string;
}

export interface Snapshot {
  at: number;
  intervalMs: number;
  omlx: OmlxServerStatus;
  history: SnapshotPoint[];
  warnings: Warning[];
}

// Lightweight shape check to catch malformed answers without importing all snapshot types.
const isSnapshot = (value: unknown): value is Snapshot => {
  if (!isRecord(value)) return false;
  if (typeof value.at !== 'number' || typeof value.intervalMs !== 'number') return false;
  if (!isRecord(value.omlx) || !isRecord(value.omlx.summary)) return false;
  if (!Array.isArray((value as unknown as { omlx: { active_models: unknown[] } }).omlx.active_models)) return false;
  if (!isRecord(value.history)) return false;
  const history = value.history as unknown as { omlx: unknown[]; system: unknown };
  if (!Array.isArray(history.omlx)) return false;
  if (!isRecord(history.system)) return false;
  const system = history.system as unknown as { cpu: unknown[]; memory: unknown[] };
  if (!Array.isArray(system.cpu) || !Array.isArray(system.memory)) return false;
  if (!Array.isArray(value.warnings)) return false;
  return true;
};

const failureOf = (error: unknown): PollFailure => {
  if (!(error instanceof HostRequestError)) return 'unreachable';
  if (error.code === 'NO_SERVICE' || error.code === 'NOT_GRANTED') return 'needs-approval';
  if (error.code === 'DISABLED') return 'paused';
  if (error.code === 'SERVICE_FAILED') return 'service-failed';
  return 'unreachable';
};

export const isOnScreen = (root: HTMLElement): boolean => !document.hidden && root.getBoundingClientRect().width > 0;

export const startPolling = (
  host: HostClient,
  root: HTMLElement,
  onSnapshot: (snapshot: Snapshot) => void,
  onFailure: (failure: PollFailure) => void,
): { refresh: () => void } => {
  let inflight = false;
  let pollingInterval = POLLS_INTERVAL;
  const poll = async (): Promise<void> => {
    if (inflight) return;

    inflight = true;
    try {
      if (!isOnScreen(root)) return;

      const result = await host.serviceRequest({ method: 'GET', path: '/snapshot' });
      let body: unknown;
      try {
        body = JSON.parse(result.body);
      } catch {
        body = null;
      }
      if (result.status === 200 && isSnapshot(body)) {
        onSnapshot(body as Snapshot);
        const activeRequests = (body as Snapshot).omlx.summary.total_active_requests;
        pollingInterval = activeRequests > 0 ? 100 : POLLS_INTERVAL;
      } else {
        onFailure(result.status === 200 ? 'bad-answer' : 'service-failed');
      }
    } catch (error) {
      onFailure(failureOf(error));
    } finally {
      inflight = false;
      setTimeout(() => { void poll(); }, pollingInterval);
    }
  };
  void poll();

  let shown = isOnScreen(root);
  const onVisibility = (): void => {
    const next = isOnScreen(root);
    if (next && !shown) void poll();
    shown = next;
  };
  document.addEventListener('visibilitychange', onVisibility);
  const ro = new ResizeObserver(onVisibility);
  ro.observe(document.documentElement);
  ro.observe(root);

  return { refresh: () => { void poll(); } };
};
