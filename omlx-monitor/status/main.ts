// oMLX Monitor Status Section UI
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

let currentModel = 'oMLX';
let currentTokens = '0 tokens';
let currentTps = 'offline';

function refreshStatus(status: Snapshot) {
  const modelStatuses = status.omlx.active_models;
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

let currentStatus: Snapshot = {
  at: Date.now(),
  intervalMs: 2000,
  omlx: {
    host: '127.0.0.1',
    port: 8000,
    authenticated: false,
    active_models: [],
    summary: { total_prefilling: 0, total_generating: 0, total_waiting: 0, total_active_requests: 0, total_waiting_requests: 0, models_loaded: 0 },
  },
  history: [],
  warnings: [],
};

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

async function update() {
  try {
    const snapshot = await client.fetch<Snapshot>('/snapshot');
    currentStatus = snapshot;
    refreshStatus(snapshot);

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
  } catch {
    refreshStatus({
      ...currentStatus,
      omlx: { ...currentStatus.omlx, authenticated: false },
    });
    root.innerHTML = '';
    const row = document.createElement('div');
    row.className = 'row';
    row.style.color = 'var(--oc-error)';
    row.innerText = 'oMLX Monitor offline';
    root.append(row);
  }
}

update();
setInterval(update, 2_000);
