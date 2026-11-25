// oMLX Monitor Status Section UI
import { connectHost } from '@openchamber/sdk';

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

interface StatusInfo {
  model: string;
  tokens: string;
  tps: string;
  percent: number | null;
}

const host = connectHost();
const root = document.getElementById('root');
if (!root) throw new Error('Missing #root');

let prefillStatus: StatusInfo | null = null;
let generatingStatus: StatusInfo | null = null;
let currentStatus: Snapshot | null = null;

function currentModel(): string {
  if (prefillStatus?.model) return prefillStatus.model;
  if (generatingStatus?.model) return generatingStatus.model;
  if (!currentStatus) return 'Mirage';
  const models = currentStatus!.omlx.active_models ?? [];
  if (models.length > 0) return models[0]!.id;
  return 'Mirage';
}

function currentPrefillText(): string {
  if (prefillStatus) return `${prefillStatus.tokens} @ ${prefillStatus.tps}`;
  return 'Idle @ Idle';
}

function currentGenerateText(): string {
  if (generatingStatus) return `${generatingStatus.tokens} @ ${generatingStatus.tps}`;
  return 'Idle @ Idle';
}

function refreshStatus(snapshot: Snapshot): void {
  currentStatus = snapshot;
  const modelStatuses = snapshot.omlx.active_models;
  prefillStatus = null;
  generatingStatus = null;

  for (const m of modelStatuses) {
    if (!prefillStatus && m.prefilling.length > 0) {
      const p = m.prefilling[0];
      if (!p) continue;
      const percent = p.total != null && p.total > 0 ? Math.round((p.processed ?? 0) / p.total * 100) : null;
      prefillStatus = {
        model: m.id,
        tokens: `${p.processed ?? 0} tokens`,
        tps: `${p.speed != null ? p.speed.toFixed(2) : '0'} tps`,
        percent,
      };
    }
    if (!generatingStatus && m.generating.length > 0) {
      const g = m.generating[0];
      if (!g) continue;
      generatingStatus = {
        model: m.id,
        tokens: `${g.generated_tokens ?? 0} tokens`,
        tps: `${g.tokens_per_second != null ? g.tokens_per_second.toFixed(2) : '0'} tps`,
        percent: null,
      };
    }
  }
}

function createPrefillContent(): HTMLDivElement {
  const container = document.createElement('div');
  container.className = 'progress-container';

  if (!prefillStatus) {
    container.textContent = 'Idle';
    return container;
  }

  const track = document.createElement('div');
  track.className = 'progress-track';
  const fill = document.createElement('div');
  fill.className = 'progress-fill';
  fill.style.width = `${prefillStatus.percent ?? 0}%`;
  fill.style.setProperty('--pct', `${prefillStatus.percent ?? 0}%`);
  track.append(fill);
  container.append(track);

  const text = document.createElement('span');
  text.className = 'progress-text';
  text.textContent = `${prefillStatus.percent ?? '-'}% @ ${prefillStatus.tps}`;
  container.append(text);

  return container;
}

function createGenerateContent(): HTMLDivElement {
  const div = document.createElement('div');
  div.className = 'progress-generate';
  div.textContent = generatingStatus ? `${generatingStatus.tokens} @ ${generatingStatus.tps}` : 'Idle @ Idle';
  return div;
}

function render(snapshot: Snapshot): void {
  root!.innerHTML = '';

  const rowStatus = document.createElement('div');
  rowStatus.className = 'kv-row';
  rowStatus.innerHTML = `
    <span class="kv-label">OMLX Status</span>
    <span class="kv-value ${snapshot.omlx.authenticated ? 'live' : 'offline'}">
      ${snapshot.omlx.authenticated ? 'live' : 'offline'}
    </span>
  `;
  root!.append(rowStatus);

  const rowModel = document.createElement('div');
  rowModel.className = 'kv-row';
  rowModel.innerHTML = `
    <span class="kv-label">Model Name</span>
    <span class="kv-value">${currentModel()}</span>
  `;
  root!.append(rowModel);

  const rowPrefill = document.createElement('div');
  rowPrefill.className = 'kv-row';
  rowPrefill.innerHTML = `
    <span class="kv-label">PREFILL</span>
  `;
  rowPrefill.append(createPrefillContent());
  root!.append(rowPrefill);

  const rowGenerate = document.createElement('div');
  rowGenerate.className = 'kv-row';
  rowGenerate.innerHTML = `
    <span class="kv-label">GENERATE</span>
  `;
  rowGenerate.append(createGenerateContent());
  root!.append(rowGenerate);
}

function showFailure(failure: PollFailure): void {
  root!.innerHTML = '';
  const row = document.createElement('div');
  row.style.color = 'var(--oc-error)';
  row.innerText = FAILURE_TEXT[failure] ?? 'oMLX Monitor offline';
  root!.append(row);
}

const style = document.createElement('style');
style.textContent = `
  html, body { margin: 0; background: transparent; color: var(--oc-fg); font: 12px/1.4 var(--oc-font); }
  * { box-sizing: border-box; }
  .kv-row { display: flex; align-items: center; justify-content: space-between; }
  .kv-label {
    flex-shrink: 0;
    font-size: 10px;
    color: var(--oc-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    text-align: left;
  }
  .kv-value {
    flex: 1;
    font-size: 12px;
    font-weight: 500;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .kv-value.live { color: var(--oc-success); }
  .kv-value.offline { color: var(--oc-error); }

  .progress-container {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .progress-track {
    flex: 1;
    height: 8px;
    background: color-mix(in srgb, var(--oc-fg) 10%, transparent);
    border-radius: 4px;
    position: relative;
    overflow: hidden;
  }
  .progress-fill {
    position: absolute;
    inset: 0;
    background: var(--oc-success);
    border-radius: 4px;
    transition: width 0.2s ease;
  }
  .progress-text {
    font-size: 11px;
    color: var(--oc-muted);
    white-space: nowrap;
    margin-left: 4px;
  }
  .progress-generate {
    flex: 1;
    font-size: 12px;
    font-weight: 500;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
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
