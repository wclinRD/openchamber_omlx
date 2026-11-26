# oMLX Live Stream Prefill & Generate Monitor

This is an **OpenChamber** extension that monitors an **oMLX server** in real time via the oMLX Admin API, showing model load status, prefill progress, generate status, and waiting queue information.

It is inspired by the [LM Studio Monitor](https://github.com/wclin/lmstudio_monitor) architecture but targets the oMLX server.

---

## Features

- **Model Status**: show loaded/unloaded/preparing states.
- **Prefill Progress**: token progress, processing speed (TPS), ETA for active prefill requests.
- **Generate Status**: generated tokens and tokens per second for active generation requests.
- **Waiting Queue**: queue position, elapsed time, prompt token counts.
- **SSE Live Updates**: panel and status receive incremental changes over Server-Sent Events.
- **OpenChamber panel/status**: can be used inside OpenChamber workspaces or via a standalone service.

---

## Requirements

- OpenChamber >= 2.3.3
- [Bun](https://bun.sh) (for building and running locally)
- oMLX server with Admin API enabled and a valid `OMLX_API_KEY` bearer token.

---

## Setup & Development

```bash
# Install dependencies
bun install

# Build the extension JS files
bun run build

# (Optional) Run the service locally to test the API endpoints
bun run service/main.ts
```

The extension is located directly in this repo root, which also serves as the OpenChamber extension root. The built files are:

- `service/main.js` – service backend
- `panel/main.js` – panel component
- `status/main.js` – status section component

For full design and implementation details, see [`doc/Design.md`](doc/Design.md).

---

## Configuration

The oMLX Monitor service reads the oMLX Admin API key from:

- `OMLX_API_KEY` environment variable
- or `~/.omlx/settings.json` (omlx CLI default settings)

If no key is configured, the service will report `authenticated: false` and skip API calls.

---

## OpenChamber Integration

Inside OpenChamber, this extension contributes:

- A panel at `panel/index.html`.
- A compact status section at `status/index.html`, titled `oMLX Status`.
- A background service at `service/main.js`.

The panel and status automatically poll the service endpoint and receive SSE events when model/request states change.

---

## License

MIT
