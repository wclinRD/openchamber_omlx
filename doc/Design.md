# Design: oMLX Live Stream Prefill & Generate Monitor

## 1. 需求與目標

模仿 `/Users/wclin/openchamber/lmstudio_monitor` 的架構與體驗，實作一個針對 **oMLX server** 的即時監控工具，但資料來源改為 oMLX Admin API。

目標：
- 取得 oMLX server 上每個模型的 **load/unload/ready** 狀態。
- 取得當前所有 active 請求的 **prefill progress**（處理 token / 總 token / 速度 / ETA）。
- 取得當前所有 **generate** 請求的狀態（已產生 token / tokens per second / elapsed）。
- 取得等待中的請求（queue position, elapsed, prompt tokens）。
- 提供與 LM Studio Monitor 類似的 UI (panel/status) 與 SSE 即時更新。
- 可透過 OpenChamber 擴展或獨立本地服務運行。

---

## 2. oMLX Admin API 資料來源調查

根據 oMLX 原始碼與 [docs/admin-api.md](https://github.com/jundot/omlx/blob/main/docs/admin-api.md)：

### 2.1 模型列表與狀態

- `GET /admin/api/models`：回傳所有發現的模型（載入狀態、大小、設定）。  
  需 `Authorization: Bearer $OMLX_API_KEY`。

- `POST /admin/api/models/{model_id}/load`、`unload`：手動載入/卸載模型。

### 2.2 活躍請求狀態（推薦）

- `GET /admin/api/activity`：輕量端點，適合高頻 polling（500ms）。  
  回傳 `active_models` 物件，包含：
  - `active_models.models`: 所有模型與活動請求（`prefilling`, `generating`, `waiting` 陣列）。
  - `active_models.total_active_requests`、`active_models.total_waiting_requests`。
  - `active_models.model_memory_used`、`active_models.memory_pressure`。

- `GET /admin/api/models`：完整模型列表與狀態（載入狀態、設定）。需 `Authorization: Bearer $OMLX_API_KEY`。

- `GET /admin/api/stats?scope=session&model=`：完整服務統計（token 計數、速度、快取、memory_guard、engines），較耗費，可作備援或儀表板摘要。

### 2.3 請求中斷 API

- `POST /admin/api/models/{model_id}/requests/{request_id}/abort`：中斷特定等待/prefill/generate 請求，不卸載模型。

### 2.4 驗證與頭部

- 所有 Admin API 需 Bearer token。可在 `omlx serve --api-key xxx` 或 `~/.omlx/settings.json` 設定。
- `/v1/chat/completions` 串流的 `X-oMLX-Request-ID` header 可與 activity 中的 `request_id` 對應。

---

## 3. 系統架構

```
OpenChamber (panel/status)
    |
    | GET /snapshot, SSE /omlx-events
    v
oMLX Monitor Service (Node.js, run by OpenChamber)
    |
    | HTTP GET poll every 2s
    v
oMLX Server Admin API (http://127.0.0.1:8000/admin/api/activity)
    |
    v
Active Model Data -> transformed -> Snapshot / Events
```

### 3.1 兩個端點設計

1. `/snapshot`：返回一份快照，供 Panel 和 Status 同時繪製與讀取。
   - `at`, `intervalMs`
   - `omlx.host`, `omlx.port`, `omlx.authenticated`
   - `omlx.active_models`: `[ { id, loaded, state, memory_used, prefilling, generating, waiting, total_active_requests, total_waiting_requests } ]`
   - `omlx.summary`: `{ total_prefilling, total_generating, total_waiting, total_active_requests, total_waiting_requests }`
   - `omlx.memory_pressure`: `{ enabled, current_bytes, soft_bytes, hard_bytes, current_formatted, soft_formatted, hard_formatted, pressure_level }`（oMLX 服務端提供的記憶體壓力狀態）
   - `history`: 歷史數據點（過去 90 次）
   - `warnings`: 若 API unreachable、未設定 key、401/503

2. `/omlx-events`：SSE 端點，在 omlx server 狀態變動時推播。
   - 類型：`'prefill-progress'`, `'generate-tokens'`, `'chat-start'`, `'chat-end'`, `'model-load'`, `'model-unload'`
   - 每次 `/snapshot` polling 後，與前一次比較，只推播變動的模型與請求。

### 3.2 資料轉換邏輯

對 oMLX Admin API 的 `active_models`，轉換為以下內部結構：

```ts
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

export interface OmlxRequestStatus {
  request_id: string;
  elapsed_seconds: number | null;
  processed: number | null;
  total: number | null;
  generated_tokens: number | null;
  tokens_per_second: number | null;
  speed: number | null; // for prefill
  eta: number | null;
}

export interface OmlxWaitingStatus {
  request_id: string;
  queue_position: number;
  elapsed_seconds: number;
  prompt_tokens: number;
}
```

**狀態推斷**：
- 若 `prefilling.length > 0`，該模型狀態視為 `prefill`（仍為 loaded）。
- 若 `generating.length > 0`，狀態為 `generate`。
- 若 `waiting.length > 0`，狀態為 `waiting`（已載入）。
- `loaded === true` 時，`state` 可以是 `loaded`。

**TPS / PPS 計算**：
- oMLX 的 `prefilling` 已提供 `speed`（tokens/sec），可直接使用。
- `generating` 已提供 `tokens_per_second`。
- 若需累計 TPS：自 `request_id` 首次出現記錄 elapsed，計算 `generated_tokens / elapsed_seconds` 作為備援顯示。

### 3.3 輪詢與緩衝

- 使用 `/admin/api/activity` 每 2 秒 poll。
- 若無任何 client 連接到 `/snapshot` 或 `/omlx-events`，服務可停止（Idle 20 秒後停止），類似 LM Studio Monitor。
- 歷史數據保存最多 90 點（3 分鐘）。

---

## 4. 實作計畫與檔案結構

### 4.1 專案位置

現在整個 repo 根目錄即為 OpenChamber 擴展根目錄，已移除 `omlx-monitor/` 中間層（與 `lmstudio_monitor` 結構相同）。架構如下：

```
/
├── package.json
├── tsconfig.json
├── bun.lock
├── DESIGN.md (此文件)
├── README.md
├── service/main.ts
├── service/omlx-api.ts
├── service/omlx-events.ts
├── service/omlx-sampler.ts
├── service/snapshot.ts
├── shared/snapshot.ts
├── shared/style.ts
├── shared/client.ts
├── panel/index.html
├── panel/main.ts
├── status/index.html
├── status/main.ts
├── scripts/build.ts
└── service/main.js (build 後)
```

> 注意：`status/main.ts` 是 Status Panel 的唯一 TypeScript 來源，由 `scripts/build.ts` 編譯為 `status/main.js`。過去曾存在 `src/status/main.ts`，但與 `status/main.ts` 重複且未被使用，已移除以維持單一來源之一致性。`service/main.ts` 為 Service 來源，編譯為 `service/main.js`。

### 4.2 核心模組說明

| 檔案 | 職責 |
|---|---|
| `omlx-api.ts` | 連接 oMLX Admin API，執行 `GET /admin/api/activity`、`GET /admin/api/stats`、`POST /admin/api/models/.../abort`，處理 Bearer key 與錯誤。 |
| `omlx-sampler.ts` | 定期 polling，將 oMLX `active_models` 轉換為 `OmlxModelStatus[]`，計算歷史數據與警告。 |
| `omlx-events.ts` | 管理 SSE clients，比較前後 snapshot，只推播變動的事件。 |
| `service/main.ts` | 類似 LM Studio Monitor，處理 `/health`, `/snapshot`, `/omlx-events`, `/abort`, `/build` 等，控制 polling 啟動/停止。 |
| `shared/snapshot.ts` | 定義 `Snapshot`, `OmlxModelStatus`, `OmlxRequestStatus`, `LmStudioEvent`-like event types。 |
| `panel/main.ts` / `status/main.ts` | OpenChamber SDK 組件，顯示模型卡片、prefill/generate 列表與歷史曲線。 |

### 4.3 實作階段

**Stage 1：API 與 Service**
- [x] 建立專案骨架與 `package.json`
- [x] 實作 `omlx-api.ts`，支援 Bearer key（從環境 `OMLX_API_KEY` 或 `~/.omlx/settings.json` 讀取）
- [x] 實作 `omlx-sampler.ts`，每 2 秒 poll `/admin/api/activity`
- [x] 實作 `service/main.ts`，提供 `/snapshot`、`/omlx-events`、`/health`
- [x] 編譯為 JS，測試 `/snapshot` 回傳。

**Stage 2：Panel & Status UI**
- [x] 設計面板卡片：各模型的 loaded/prefilling/generating/waiting 狀態。
- [x] 顯示 active request 列表（prefill progress、generated tokens、tps）。
- [x] 提供中斷請求按鈕（`POST /admin/api/models/.../requests/.../abort`）。
- [x] Status section 短報（總數、目前模型、最大 TPS）。

**Stage 3：SSE Live Events**
- [x] 比較 snapshot，產生 `prefill-progress`、`generate-tokens`、`model-load`、`model-unload` 事件。
- [x] 在 panel/status 即時更新。

**Stage 4：整合 OpenChamber**
- [x] 透過 `openchamber contribute` 設定 `panel`、`statusSection`、`service`。
- [x] 安裝測試。

**Stage 5：系統資源監控整合（新增）**
- [x] 在 `Snapshot` 加入 `system: SystemStats` 與 `history.system: Series`，維持 90 點 history
- [x] `OmlxSampler` 加入系統 CPU/Memory/Network 採樣（參考 lmstudio_monitor，5 秒一次）
- [x] `status/main.ts` 增加 CPU/Memory/Network 三行顯示，與現有 oMLX 指標並排
- [x] 更新 `doc/Design.md` 記錄系統資源整合規範
- [x] 將 OpenChamber `statusSection` 高度調高，避免系統與 oMLX 七行數據捲動

---

### 4.4 系統資源整合設計（Stage 5）

從 lmstudio_monitor 的 `Sampler` 整合系統資源：

- **SystemStats**：`hostname`, `platform`, `release`, `arch`, `cpuModel`, `cores`, `cpu`（0~100 百分比），`load`（macOS/Linux），`memoryTotal`, `memoryUsed`, `uptimeSeconds`, `networkSpeedUp`, `networkSpeedDown`。
- **history.system**：`cpu`、`memory` 兩條數列，各 90 點（3 分鐘）；目前 UI 只顯示即時數值，history 供未來擴展。
- **採樣方式**：
  - CPU：`os.cpus()`，前後采樣計算 idle/total 差值得整體 CPU 佔用。
  - Memory：`os.totalmem()` - `os.freemem()`（若 `source.memoryUsed()` 失敗的 fallback）。
  - Network：macOS `netstat -ib`，Linux `/proc/net/dev`，計算前後采樣差值的 byte/sec，跳過 `lo0`/`lo`。
  - **頻率**：系統資源每 5 秒採樣一次，低於 oMLX 的 2 秒週期，減少 UI 跳動。
- **Status UI 顯示**：
  - CPU：進度條顏色 `var(--oc-info)`。
  - Memory：進度條顏色 `var(--oc-success)`。
  - Network：僅數值，無進度條。
  - 與現有 oMLX 指標分開，依序：System → oMLX。
- **高度與捲動設定**：
  - `package.json` 中 `statusSection.height` 設為 `180`，容納 7 行數據（CPU、Memory、Network、Model、Prefill、Generate、Pressure），不產生捲動且減少留白。

---

## 5. 與 oMLX 原生儀表板的差異

oMLX 已提供 `/admin` Web UI，但：
- 原生 UI 只在瀏覽器中操作，不易與其他 OpenChamber 工作區整合。
- 我們需要的是 **OpenChamber Extension 級的即時資訊**，可在 Chat Work Status 或 Resource Monitor 旁顯示。
- 此工具作為「外掛」，不影響 oMLX server，也避免在瀏覽器端直接管理。

---

## 6. 參考資料

- oMLX Admin API：https://github.com/jundot/omlx/blob/main/docs/admin-api.md
- oMLX GitHub README（streaming & return_progress）：https://github.com/jundot/omlx
- LM Studio Monitor：https://github.com/wclin/lmstudio_monitor
