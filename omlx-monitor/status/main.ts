// oMLX Monitor Status Section UI
import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';

import { PollFailure, FAILURE_TEXT, startPolling } from '../src/shared/client.ts';

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

interface StatusInfo {
  model: string;
  tokens: string;
  tps: string;
}

const host = connectHost();
const root = document.getElementById('root');
if (!root) throw new Error('Missing #root');

let prefillStatus: StatusInfo | null = null;
let generatingStatus: StatusInfo | null = null;
let currentStatus: Snapshot | null = null;

function refreshStatus(snapshot: Snapshot): void {
  currentStatus = snapshot;
  const modelStatuses = snapshot.omlx.active_models;
  prefillStatus = null;
  generatingStatus = null;

  for (const m of modelStatuses) {
    if (!prefillStatus && m.prefilling.length > 0) {
      const p = m.prefilling[0];
      prefillStatus = {
        model: m.id,
        tokens: `${p.processed ?? 0} tokens`,
        tps: `${p.speed ?? 0} tps`,
      };
    }
    if (!generatingStatus && m.generating.length > 0) {
      const g = m.generating[0];
      generatingStatus = {
        model: m.id,
        tokens: `${g.generated_tokens ?? 0} tokens`,
        tps: `${g.tokens_per_second ?? 0} tps`,
      };
    }
  }
}

function createColumn(title: string, status: StatusInfo): HTMLDivElement {
  const col = document.createElement('div');
  col.className = 'column';

  const titleEl = document.createElement('div');
  titleEl.className = 'column-title';
  titleEl.innerText = title;
  col.append(titleEl);

  const modelEl = document.createElement('div');
  modelEl.className = 'column-model';
  modelEl.innerText = status.model;
  col.append(modelEl);

  const tokensEl = document.createElement('div');
  tokensEl.className = 'column-body';
  tokensEl.innerText = status.tokens;
  col.append(tokensEl);

  const tpsEl = document.createElement('div');
  tpsEl.className = 'column-meta';
  tpsEl.innerText = `@ ${status.tps}`;
  col.append(tpsEl);

  return col;
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

  const colPrefill = createColumn('Prefill', prefillStatus || {
    model: 'oMLX',
    tokens: 'Idle',
    tps: 'Idle',
  });
  const colGenerating = createColumn('Generate', generatingStatus || {
    model: 'oMLX',
    tokens: 'Idle',
    tps: 'Idle',
  });

  row.append(colPrefill, colGenerating);
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
  .row { display: flex; align-items: center; gap: 12px; }
  .badge { font-size: 10px; padding: 0 4px; border-radius: 4px; line-height: 14px; }
  .badge.success { background: color-mix(in srgb, var(--oc-success) 16%, transparent); color: var(--oc-success); }
  .badge.muted { background: color-mix(in srgb, var(--oc-fg) 8%, transparent); color: var(--oc-muted); }
  .column { display: flex; flex-direction: column; gap: 2px; }
  .column-title { font-size: 10px; color: var(--oc-muted); text-transform: uppercase; letter-spacing: 0.05em; }
  .column-model { font-size: 12px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .column-body { font-size: 11px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .column-meta { font-size: 10px; color: var(--oc-muted); }
`;
document.head.append(style);

host.onReady(async (context) => {
  applyHostReady(context, document.documentElement);
  const { startPolling } = await import('../src/shared/client.ts');
  const pollController = startPolling(host, root, (snapshot) => {
    refreshStatus(snapshot);
    render(snapshot);
  }, showFailure);

  void pollController.refresh();
});