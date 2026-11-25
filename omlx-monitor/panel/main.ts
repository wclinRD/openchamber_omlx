// oMLX Monitor Panel UI
import { createClient } from '@openchamber/sdk';

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

const client = createClient({ serviceId: 'omlx-monitor' });
const root = document.getElementById('root');
if (!root) throw new Error('Missing #root');

const style = document.createElement('style');
style.textContent = `
  html, body { margin: 0; background: transparent; color: var(--oc-fg); font: 12px/1.4 var(--oc-font); }
  * { box-sizing: border-box; }
  .num { font-variant-numeric: tabular-nums; }
  .muted { color: var(--oc-muted); }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; margin-bottom: 14px; }
  .card { min-width: 0; display: flex; flex-direction: column; gap: 8px; padding: 12px;
    border-radius: var(--oc-radius); background: color-mix(in srgb, var(--oc-fg) 4%, transparent); }
  .card-title { font-size: 13px; font-weight: 600; letter-spacing: .02em; color: var(--oc-muted); text-transform: uppercase; display: flex; align-items: center; gap: 8px; }
  .big { font-size: 22px; font-weight: 600; line-height: 1.1; letter-spacing: -.01em; }
  .row-head { font-size: 11px; font-weight: 600; margin-bottom: 4px; color: var(--oc-muted); }
  .req-list { display: flex; flex-direction: column; gap: 4px; }
  .req-row { display: flex; align-items: center; gap: 8px; }
  .req-lead { width: 48px; font-size: 11px; color: var(--oc-muted); }
  .req-main { flex: 1 1 auto; font-size: 11px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .req-meta { width: 72px; font-size: 11px; text-align: right; color: var(--oc-muted); }
  .progress { height: 6px; border-radius: 999px; background: var(--oc-border); position: relative; margin: 4px 0; }
  .progress-fill { height: 100%; border-radius: 999px; background: var(--oc-primary); transform-origin: left; transition: transform .2s ease; }
  .empty { color: var(--oc-muted); padding: 8px 0; font-size: 11px; }
  .head { display: flex; align-items: baseline; gap: 8px; margin-bottom: 12px; }
  .head .grow { flex: 1; }
  .live { display: inline-flex; align-items: center; gap: 6px; color: var(--oc-muted); font-size: 11px; white-space: nowrap; padding-top: 2px; }
  .live::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--oc-success); }
  .live.stale::before { background: var(--oc-muted); }
  .banner { padding: 8px 12px; border-radius: var(--oc-radius);
    background: color-mix(in srgb, var(--oc-error) 10%, transparent); color: var(--oc-error-text, var(--oc-fg)); }
  h2 { font-size: 13px; font-weight: 600; margin: 12px 0 8px; color: var(--oc-fg); }
  .footer { color: var(--oc-muted); font-size: 11px; margin-top: 12px; }
`;
document.head.append(style);

function statusBadge(state: string): string {
  const base = state === 'loaded' ? 'success' : state === 'loading' ? 'info' : state === 'error' ? 'error' : 'muted';
  return `oc-sdk-badge ${base}`;
}

function progressPercent(req: OmlxRequestStatus): number | null {
  if (req.processed === null || req.total === null || req.total === 0) return null;
  return Math.min(100, Math.round((req.processed / req.total) * 100));
}

function formatSeconds(s: number | null): string {
  if (s === null) return '—';
  if (s < 60) return `${s.toFixed(1)}s`;
  return `${Math.floor(s / 60)}m${Math.floor(s % 60)}s`;
}

function modelCard(m: OmlxModelStatus): HTMLElement {
  const card = document.createElement('div');
  card.className = 'card';

  const title = document.createElement('div');
  title.className = 'card-title';
  title.append(m.id, document.createElement('span'), document.createElement('span').className = statusBadge(m.state), document.createElement('span').innerText = m.state);

  const list = document.createElement('div');
  list.className = 'req-list';

  if (m.prefilling.length > 0) {
    const head = document.createElement('div');
    head.className = 'row-head';
    head.innerText = 'Prefill';
    list.append(head);
    for (const req of m.prefilling) {
      const pbar = document.createElement('div');
      pbar.style.margin = '4px 0';
      const pfill = document.createElement('div');
      pfill.className = 'progress';
      const bar = document.createElement('div');
      bar.className = 'progress-fill';
      const pct = progressPercent(req);
      if (pct !== null) bar.style.transform = `scaleX(${pct / 100})`;
      pfill.append(bar);
      pbar.append(pfill);

      const row = document.createElement('div');
      row.className = 'req-row';
      const lead = document.createElement('span');
      lead.className = 'req-lead';
      lead.innerText = 'req';
      const main = document.createElement('span');
      main.className = 'req-main';
      main.innerText = `${req.processed ?? 0}/${req.total ?? 0} tokens`;
      const meta = document.createElement('span');
      meta.className = 'req-meta';
      meta.innerText = pct !== null ? `${pct}%` : `${req.speed ?? 0} tps`;
      row.append(lead, main, meta);
      list.append(pbar, row);
    }
  }

  if (m.generating.length > 0) {
    const head = document.createElement('div');
    head.className = 'row-head';
    head.innerText = 'Generate';
    list.append(head);
    for (const req of m.generating) {
      const row = document.createElement('div');
      row.className = 'req-row';
      const lead = document.createElement('span');
      lead.className = 'req-lead';
      lead.innerText = 'req';
      const main = document.createElement('span');
      main.className = 'req-main';
      main.innerText = `${req.generated_tokens ?? 0} tokens`;
      const meta = document.createElement('span');
      meta.className = 'req-meta';
      meta.innerText = `${req.tokens_per_second ?? 0} tps · ${formatSeconds(req.elapsed_seconds)}`;
      row.append(lead, main, meta);
      list.append(row);
    }
  }

  if (m.waiting.length > 0) {
    const head = document.createElement('div');
    head.className = 'row-head';
    head.innerText = 'Waiting';
    list.append(head);
    for (const req of m.waiting) {
      const row = document.createElement('div');
      row.className = 'req-row';
      const lead = document.createElement('span');
      lead.className = 'req-lead';
      lead.innerText = `#${req.queue_position}`;
      const main = document.createElement('span');
      main.className = 'req-main';
      main.innerText = `${req.prompt_tokens} tokens`;
      const meta = document.createElement('span');
      meta.className = 'req-meta';
      meta.innerText = formatSeconds(req.elapsed_seconds);
      row.append(lead, main, meta);
      list.append(row);
    }
  }

  if (!m.prefilling.length && !m.generating.length && !m.waiting.length) {
    const empty = document.createElement('div');
    empty.className = 'empty';
    empty.innerText = 'No active requests';
    list.append(empty);
  }

  card.append(title, list);
  return card;
}

async function update() {
  try {
    const snapshot = await client.fetch<Snapshot>('/snapshot');
    const { omlx, warnings } = snapshot;

    root.innerHTML = '';

    if (warnings.length > 0) {
      const banner = document.createElement('div');
      banner.className = 'banner';
      banner.innerText = warnings.map((w) => w.message).join('; ');
      root.append(banner);
    }

    const head = document.createElement('div');
    head.className = 'head';
    head.append(
      document.createElement('span').className = 'live'.concat(!omlx.authenticated ? ' stale' : ''),
      document.createElement('span').className = 'grow',
      document.createElement('span').className = 'big'.concat(' num'),
      document.createElement('span').innerText = `${omlx.summary.models_loaded} models`,
      document.createElement('span').innerText = `Live`
    );
    root.append(head);

    const summaryGrid = document.createElement('div');
    summaryGrid.className = 'grid';

    const stat = (label: string, value: string) => {
      const card = document.createElement('div');
      card.className = 'card';
      const l = document.createElement('div');
      l.className = 'card-title';
      l.innerText = label;
      const v = document.createElement('div');
      v.className = 'big'.concat(' num');
      v.innerText = value;
      card.append(l, v);
      return card;
    };

    summaryGrid.append(
      stat('Active', String(omlx.summary.total_active_requests)),
      stat('Waiting', String(omlx.summary.total_waiting_requests)),
      stat('Prefill', String(omlx.summary.total_prefilling)),
      stat('Generate', String(omlx.summary.total_generating))
    );
    root.append(summaryGrid);

    const modelsTitle = document.createElement('h2');
    modelsTitle.innerText = `Models (${omlx.active_models.length})`;
    root.append(modelsTitle);

    for (const model of omlx.active_models) {
      root.append(modelCard(model));
    }

    const footer = document.createElement('div');
    footer.className = 'footer';
    footer.innerText = `Updated every ${snapshot.intervalMs} ms`;
    root.append(footer);
  } catch (err) {
    root.innerHTML = `<div class="banner">Failed to connect to oMLX Monitor service.<br>${err instanceof Error ? err.message : String(err)}</div>`;
  }
}

update();
setInterval(update, 2_000);
