// oMLX Monitor Status Section UI
import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';

import { PollFailure, FAILURE_TEXT, startPolling } from '../src/shared/client.ts';
import { mountChart, ChartHandle } from '../src/shared/chart.ts';

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

interface SystemStats {
  hostname: string;
  platform: string;
  release: string;
  arch: string;
  cpuModel: string;
  cores: number;
  cpu: number | null;
  load: [number, number, number] | null;
  memoryTotal: number;
  memoryUsed: number;
  uptimeSeconds: number;
  networkSpeedUp: number;
  networkSpeedDown: number;
}

interface Snapshot {
  at: number;
  intervalMs: number;
  omlx: OmlxServerStatus;
  system: SystemStats;
  history: {
    omlx: { at: number; prefilling: number; generating: number; waiting: number; active_requests: number; waiting_requests: number }[];
    system: { cpu: number[]; memory: number[] };
  };
  warnings: { code: string; message: string }[];
}

interface StatusInfo {
  model: string;
  tokens: string;
  tps: string;
  percent: number | null;
}

interface MemoryStatusInfo {
  current: string;
  current_bytes: number;
  soft: string;
  soft_bytes: number;
  hard: string;
  level: string;
}

// Number formatting
let locale = 'en';
const number = (value: number, digits: number): string => new Intl.NumberFormat(locale, {
  minimumFractionDigits: digits,
  maximumFractionDigits: digits,
}).format(value);

const formatBytes = (bytes: number): string => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let value = Math.max(0, bytes);
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  const digits = unit >= 3 && value < 100 ? 1 : 0;
  return `${number(value, digits)} ${units[unit]}`;
};

const formatPercent = (value: number | null): string => {
  if (value === null) return '–';
  if (value > 0 && value < 0.1) return '<0.1%';
  return `${number(value, value < 10 ? 1 : 0)}%`;
};

const formatSpeed = (bytesPerSecond: number): string => {
  if (bytesPerSecond === 0) return '0 KB/s';
  if (bytesPerSecond <= 0) return '0 B/s';
  const units = ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s'];
  let value = bytesPerSecond;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  const digits = unit >= 3 && value < 100 ? 1 : 0;
  return `${number(value, digits)} ${units[unit]}`;
};

const host = connectHost();
const root = document.getElementById('root');
if (!root) throw new Error('Missing #root');

let prefillStatus: StatusInfo | null = null;
let generatingStatus: StatusInfo | null = null;
let memoryStatus: MemoryStatusInfo | null = null;
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

  if (snapshot.omlx.memory_pressure) {
    const mp = snapshot.omlx.memory_pressure;
    memoryStatus = {
      current: mp.current_formatted,
      current_bytes: mp.current_bytes,
      soft: mp.soft_formatted,
      soft_bytes: mp.soft_bytes,
      hard: mp.hard_formatted,
      level: mp.pressure_level,
    };
  } else {
    memoryStatus = null;
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

const openchamberChart = mountChart({
  color: 'var(--oc-primary)',
  height: 18,
  capacity: 90,
  format: (v) => `${formatBytes(v)}`,
  intervalSeconds: 2,
});

function openchamberRow(snapshot: Snapshot): HTMLElement {
  const row = el('div', 'line', '', [
    el('span', 'what', 'OpenChamber'),
    openchamberChart.element,
    el('span', 'value num', '–'),
  ]);
  row.title = 'Memory and CPU of OpenChamber, OpenCode, and everything they started. CPU counts 100% per core.';
  return row;
}

function render(snapshot: Snapshot): void {
  root!.innerHTML = '';

  // OpenChamber section
  const rowOpenchamber = openchamberRow(snapshot);
  const ocValue = rowOpenchamber.querySelector<HTMLElement>('.value')!;
  ocValue.textContent = `${formatBytes(snapshot.app.memory)} · ${formatPercent(snapshot.app.cpu)}`;
  const maxMemory = Math.max(snapshot.app.memory, ...snapshot.history.app.memory) * 1.15;
  openchamberChart.update(snapshot.history.app.memory, maxMemory);
  root!.append(rowOpenchamber);

  // System section
  const rowCpu = document.createElement('div');
  rowCpu.className = 'line';
  const cpuValue = snapshot.system.cpu !== null ? formatPercent(snapshot.system.cpu) : '–';
  const cpuPercent = snapshot.system.cpu !== null ? Math.max(0, Math.min(100, snapshot.system.cpu)) : 0;
  const cpuMeter = document.createElement('div');
  cpuMeter.className = 'meter';
  const cpuFill = document.createElement('span');
  cpuFill.className = 'meter-fill meter-fill-cpu';
  cpuFill.style.width = `${cpuPercent}%`;
  cpuMeter.append(cpuFill);
  const cpuText = document.createElement('span');
  cpuText.className = 'value num';
  cpuText.textContent = cpuValue;
  rowCpu.append(el('span', 'what', 'CPU'), cpuMeter, cpuText);
  root!.append(rowCpu);

  const rowMemory = document.createElement('div');
  rowMemory.className = 'line';
  const memPct = Math.max(0, Math.min(100, (snapshot.system.memoryUsed / Math.max(1, snapshot.system.memoryTotal)) * 100));
  const memoryMeter = document.createElement('div');
  memoryMeter.className = 'meter';
  const memoryFill = document.createElement('span');
  memoryFill.className = 'meter-fill meter-fill-memory';
  memoryFill.style.width = `${memPct}%`;
  memoryMeter.append(memoryFill);
  const memoryText = document.createElement('span');
  memoryText.className = 'value num';
  memoryText.textContent = `${formatBytes(snapshot.system.memoryUsed)} / ${formatBytes(snapshot.system.memoryTotal)} · ${formatPercent(memPct)}`;
  rowMemory.append(el('span', 'what', 'Memory'), memoryMeter, memoryText);
  root!.append(rowMemory);

  const rowNetwork = document.createElement('div');
  rowNetwork.className = 'line';
  const networkValue = snapshot.system.networkSpeedUp === 0 && snapshot.system.networkSpeedDown === 0
    ? '0 B/s · 0 B/s'
    : `上傳 ${formatSpeed(snapshot.system.networkSpeedUp)} · 下載 ${formatSpeed(snapshot.system.networkSpeedDown)}`;
  const networkText = document.createElement('span');
  networkText.className = 'value num';
  networkText.textContent = networkValue;
  rowNetwork.append(el('span', 'what', 'Network'), el('div', 'meter-empty'), networkText);
  root!.append(rowNetwork);

  // oMLX section
  const rowModel = document.createElement('div');
  rowModel.className = 'line';

  const modelValue = document.createElement('span');
  modelValue.className = 'value';
  modelValue.textContent = currentModel();

  rowModel.append(el('span', 'what', 'Model'), el('div', 'meter-empty'), modelValue);
  root!.append(rowModel);

  const rowPrefill = document.createElement('div');
  rowPrefill.className = 'line';
  const prefTrack = createPrefillMeter();
  rowPrefill.append(el('span', 'what', 'Prefill'), prefTrack.meter, prefTrack.text);
  root!.append(rowPrefill);

  const rowGenerate = document.createElement('div');
  rowGenerate.className = 'line';
  rowGenerate.append(el('span', 'what', 'Generate'), el('div', 'meter-empty'), el('span', 'value', createGenerateValue()));
  root!.append(rowGenerate);

  if (memoryStatus) {
    const rowOmlxMem = document.createElement('div');
    rowOmlxMem.className = 'line';

    const percent = memoryStatus.soft_bytes > 0 ? Math.min(100, Math.round((memoryStatus.current_bytes / memoryStatus.soft_bytes) * 100)) : 0;

    const omlxMemFill = document.createElement('span');
    omlxMemFill.className = 'meter-fill meter-fill-pressure';
    omlxMemFill.style.width = `${percent}%`;

    const omlxMemMeter = document.createElement('div');
    omlxMemMeter.className = 'meter';
    omlxMemMeter.append(omlxMemFill);

    const omlxMemText = document.createElement('span');
    omlxMemText.className = 'value num';
    omlxMemText.textContent = `${memoryStatus.current} / ${memoryStatus.soft} · ${percent}%`;

    rowOmlxMem.append(el('span', 'what', 'Pressure'), omlxMemMeter, omlxMemText);
    root!.append(rowOmlxMem);
  }
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
  .line { display: grid; grid-template-columns: 100px minmax(0, 1fr) auto; align-items: center; gap: 4px; min-height: 12px; }
  .line .what { color: var(--oc-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .line .value { text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums; }
  .line .value.num { font-variant-numeric: tabular-nums; }
  .chart { position: relative; width: 100%; overflow: hidden; }
  .chart svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
  .chart-grid { stroke: var(--oc-border); stroke-width: 1; vector-effect: non-scaling-stroke; opacity: .5; fill: none; }
  .chart-cursor, .chart-dot, .chart-tip { position: absolute; pointer-events: none; opacity: 0; }
  .chart.hovering .chart-cursor, .chart.hovering .chart-dot, .chart.hovering .chart-tip { opacity: 1; }
  .chart-cursor { top: 0; bottom: 0; left: 0; width: 1px; background: var(--oc-border); }
  .chart-dot { top: -3px; left: -3px; width: 6px; height: 6px; border-radius: 50%; box-shadow: 0 0 0 2px color-mix(in srgb, var(--oc-fg) 4%, var(--oc-bg)); }
  .chart-tip { top: 2px; padding: 1px 6px; border-radius: 4px; white-space: nowrap; font-size: 11px;
    background: var(--oc-elevated); color: var(--oc-elevated-fg); font-variant-numeric: tabular-nums;
    box-shadow: inset 0 1px 0 0 rgb(255 255 255 / .8), inset 0 0 0 1px rgb(0 0 0 / .04), 0 0 0 1px rgb(0 0 0 / .1), 0 1px 2px -.5px rgb(0 0 0 / .08); }
  [data-oc-theme="dark"] .chart-tip { box-shadow: inset 0 1px 0 0 rgb(255 255 255 / .06), inset 0 0 0 1px rgb(255 255 255 / .08),
    0 0 0 1px rgb(0 0 0 / .36), 0 1px 1px -.5px rgb(0 0 0 / .22); }
  .meter { position: relative; height: 4px; border-radius: 2px; background: color-mix(in srgb, var(--oc-fg) 8%, transparent); overflow: hidden; }
  .meter > span { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 2px; transition: width .4s ease; }
  .meter-empty { height: 4px; }
  .meter-fill { background: var(--oc-success); }
  .meter-fill-cpu { background: var(--oc-info); }
  .meter-fill-memory { background: var(--oc-primary); }
  .meter-fill-pressure { background: var(--oc-warning); }
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
