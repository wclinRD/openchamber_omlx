// oMLX Monitor Status Section UI
import { connectHost } from '@openchamber/sdk';

import { PollFailure, FAILURE_TEXT, startPolling } from '../shared/client.ts';
import { applyHostReady } from '@openchamber/sdk/ui';

function el(tag: string, cls?: string, text?: string | null, children?: HTMLElement[]): HTMLElement {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined && text !== null) e.textContent = text;
  if (children) children.forEach((c) => e.append(c));
  return e;
}

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

interface MeterResult {
  meter: HTMLElement;
  text: HTMLElement;
}

function createPrefillMeter(): MeterResult {
  const meter = document.createElement('div');
  meter.className = 'meter';

  const fill = document.createElement('span');
  fill.className = 'meter-fill';
  meter.append(fill);

  const text = document.createElement('span');
  text.className = 'value num';

  if (!prefillStatus) {
    fill.style.width = '0%';
    text.textContent = 'Idle';
  } else {
    fill.style.width = `${prefillStatus.percent ?? 0}%`;
    text.textContent = `${prefillStatus.percent ?? '-'}% @ ${prefillStatus.tps}`;
  }

  return { meter, text };
}

function createGenerateValue(): string {
  return generatingStatus ? `${generatingStatus.tokens} @ ${generatingStatus.tps}` : 'Idle';
}

function render(snapshot: Snapshot): void {
  root!.innerHTML = '';

  const rowStatus = document.createElement('div');
  rowStatus.className = 'line';
  rowStatus.append(el('span', 'what', 'OMLX STATUS'), el('div', 'meter-empty'), el('span', 'value', snapshot.omlx.authenticated ? 'live' : 'offline'));
  const statusValue = rowStatus.querySelector('.value') as HTMLElement;
  if (snapshot.omlx.authenticated) statusValue.style.color = 'var(--oc-success)';
  root!.append(rowStatus);

  const rowModel = document.createElement('div');
  rowModel.className = 'line';
  rowModel.append(el('span', 'what', 'MODEL NAME'), el('div', 'meter-empty'), el('span', 'value', currentModel()));
  root!.append(rowModel);

  const rowPrefill = document.createElement('div');
  rowPrefill.className = 'line';
  const prefTrack = createPrefillMeter();
  rowPrefill.append(el('span', 'what', 'PREFILL'), prefTrack.meter, prefTrack.text);
  root!.append(rowPrefill);

  const rowGenerate = document.createElement('div');
  rowGenerate.className = 'line';
  rowGenerate.append(el('span', 'what', 'GENERATE'), el('div', 'meter-empty'), el('span', 'value', createGenerateValue()));
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
  .line { display: grid; grid-template-columns: 100px minmax(0, 1fr) auto; align-items: center; gap: 8px; min-height: 18px; }
  .line .what { color: var(--oc-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .line .value { text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums; }
  .line .value.num { font-variant-numeric: tabular-nums; }
  .meter { position: relative; height: 4px; border-radius: 2px; background: color-mix(in srgb, var(--oc-fg) 8%, transparent); overflow: hidden; }
  .meter > span { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 2px; transition: width .4s ease; }
  .meter-empty { height: 4px; }
  .meter-fill { background: var(--oc-success); }
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
