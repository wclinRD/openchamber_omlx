// oMLX Monitor Status Section UI
import { type HostClient, connectHost } from '@openchamber/sdk';
import { HostRequestError, type HostStatus } from '@openchamber/sdk';

import { PollFailure, FAILURE_TEXT, startPolling } from '../shared/client.ts';
import { applyHostReady } from '@openchamber/sdk/ui';

interface OmlxRequestStatus {
  request_id: string;
  elapsed_seconds: number | null;
  processed: number | null;
  total: number | null;
  generated_tokens: number | null;
  tokens_per_second: number | null;
  speed: number | null;
  eta: number | null;
}

interface OmlxWaitingStatus {
  request_id: string;
  queue_position: number;
  elapsed_seconds: number;
  prompt_tokens: number;
}

interface OmlxModelStatus {
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

interface OmlxSnapshotSummary {
  total_prefilling: number;
  total_generating: number;
  total_waiting: number;
  total_active_requests: number;
  total_waiting_requests: number;
  models_loaded: number;
}

interface OmlxServerStatus {
  host: string;
  port: number;
  authenticated: boolean;
  active_models: OmlxModelStatus[];
  summary: OmlxSnapshotSummary;
}

interface Snapshot {
  at: number;
  intervalMs: number;
  omlx: OmlxServerStatus;
  history: unknown[];
  warnings: { code: string; message: string }[];
}

const host = connectHost();
const root = document.getElementById('root');
if (!root) throw new Error('Missing #root');

let currentModel = 'oMLX';
let currentTokens = '0 tokens';
let currentTps = 'offline';
let currentStatus: Snapshot | null = null;

function refreshStatus(snapshot: Snapshot) {
  currentStatus = snapshot;
  const modelStatuses = snapshot.omlx.active_models;
  for (const m of modelStatuses) {
    if (m.prefilling.length > 0) {
      currentModel = m.id;
      const p = m.prefilling[0];
      currentTokens = `${p.processed ?? 0} tokens`;
      currentTps = `${p.speed ?? 0} tps`;
      return;
    }
    if (m.generating.length > 0) {
      currentModel = m.id;
      const g = m.generating[0];
      currentTokens = `${g.generated_tokens ?? 0} tokens`;
      currentTps = `${g.tokens_per_second ?? 0} tps`;
      return;
    }
    if (m.waiting.length > 0) {
      currentModel = m.id;
      currentTokens = `waiting #${m.waiting[0].queue_position}`;
      currentTps = 'waiting';
      return;
    }
  }
}

function render(snapshot: Snapshot): void {
  root.innerHTML = '';
  const row = document.createElement('div');
  row.className = 'row';

  const badge = document.createElement('span');
  badge.className = 'badge';
  if (snapshot.omlx.authenticated) badge.className += ' success';
  else badge.className += ' muted';
  badge.innerText = snapshot.omlx.authenticated ? 'live' : 'offline';
  row.append(badge);

  const text = document.createElement('span');
  text.className = 'text';
  text.innerText = `${currentModel}: ${currentTokens}`;
  row.append(text);

  const meta = document.createElement('span');
  meta.className = 'muted';
  meta.innerText = `@ ${currentTps}`;
  row.append(meta);

  root.append(row);
}

function showFailure(failure: PollFailure): void {
  root.innerHTML = '';
  const row = document.createElement('div');
  row.style.color = 'var(--oc-error)';
  row.innerText = FAILURE_TEXT[failure] ?? 'oMLX Monitor offline';
  root.append(row);
}

const style = document.createElement('style');
style.textContent = `
  html, body { margin: 0; background: transparent; color: var(--oc-fg); font: 12px/1.4 var(--oc-font); }
  * { box-sizing: border-box; }
  .row { display: flex; align-items: center; gap: 8px; }
  .badge { font-size: 10px; padding: 0 4px; border-radius: 4px; line-height: 14px; }
  .badge.success { background: color-mix(in srgb, var(--oc-success) 16%, transparent); color: var(--oc-success); }
  .badge.muted { background: color-mix(in srgb, var(--oc-fg) 8%, transparent); color: var(--oc-muted); }
  .text { font-size: 11px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .muted { color: var(--oc-muted); }
`;
document.head.append(style);

host.onReady(async (context) => {
  applyHostReady(context, document.documentElement);
  const { startPolling } = await import('../shared/client.ts');
  const pollController = startPolling(host, root, (snapshot) => {
    refreshStatus(snapshot);
    render(snapshot);
  }, showFailure);

  void pollController.refresh();
});
