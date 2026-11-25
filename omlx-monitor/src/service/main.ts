// Runs under the app's own Node runtime, on 127.0.0.1, reachable only through
// OpenChamber's proxy. `/snapshot` reads; `/abort` cancels a request; `/omlx-events`
// pushes live oMLX status via SSE.
// Sampling runs while someone is looking. Each `/snapshot` request keeps it going;
// with no request for IDLE_STOP_MS the loop stops, so a closed panel costs nothing.

import http from 'node:http';
import type { Snapshot } from '../shared/snapshot.ts';
import { createOmlxApi, type OmlxApi } from './omlx-api.ts';
import { OmlxSampler } from './omlx-sampler.ts';
import { OmlxSseManager } from './omlx-events.ts';

const HOST = '127.0.0.1';
const PORT = 12345; // open port for extension service; OpenChamber routes /omlx-monitor/*
const IDLE_STOP_MS = 20_000;

const api = await createOmlxApi();
const sampler = new OmlxSampler(api);
const sseManager = new OmlxSseManager();

let server: http.Server | null = null;
let samplerPromise: Promise<void> | null = null;
let idleTimer: NodeJS.Timeout | null = null;
let lastSnapshot: Snapshot | null = null;
let hasActiveClients = false;

function clearIdleTimer(): void {
  if (idleTimer) {
    clearTimeout(idleTimer);
    idleTimer = null;
  }
}

function startSampling(): void {
  if (samplerPromise) return;
  samplerPromise = sampler.start();
}

function stopSampling(): void {
  if (samplerPromise) {
    sampler.stop();
    samplerPromise = null;
  }
}

function restartIdleTimer(): void {
  clearIdleTimer();
  idleTimer = setTimeout(() => {
    stopSampling();
  }, IDLE_STOP_MS);
}

function startSseResponse(req: http.IncomingMessage, res: http.ServerResponse): void {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  res.write(': connected\n\n');
  sseManager.addClient(res);
  hasActiveClients = true;
  startSampling();
  restartIdleTimer();

  // Push initial snapshot state immediately so clients know current active requests.
  sampler.snapshot().then((s) => {
    sseManager.pushSnapshotEvent(lastSnapshot, s);
    lastSnapshot = s;
  }).catch(() => {
    // ignore initial snapshot failure; subsequent polling will recover
  });
}

async function handleSnapshot(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
  hasActiveClients = true;
  startSampling();
  restartIdleTimer();

  let snapshot: Snapshot;
  try {
    snapshot = await sampler.snapshot();
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: err instanceof Error ? err.message : String(err) }));
    return;
  }

  if (hasActiveClients) {
    sseManager.pushSnapshotEvent(lastSnapshot, snapshot);
    lastSnapshot = snapshot;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(snapshot));
}

async function handleAbort(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
  const bodyChunks: Buffer[] = [];
  req.on('data', (chunk) => bodyChunks.push(chunk));
  req.on('end', async () => {
    try {
      const body = JSON.parse(Buffer.concat(bodyChunks).toString('utf8'));
      const modelId = body.modelId;
      const requestId = body.requestId;
      if (!modelId || !requestId) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'modelId and requestId required' }));
        return;
      }
      await api.abortRequest(modelId, requestId);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err instanceof Error ? err.message : String(err) }));
    }
  });
}

async function handleStop(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
  hasActiveClients = false;
  stopSampling();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: true }));
}

// Build a simple HTTP server for the service to run inside OpenChamber.
server = http.createServer((req, res) => {
  const path = req.url || '/';

  if (path === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, active_clients: hasActiveClients }));
    return;
  }

  if (path === '/snapshot') {
    handleSnapshot(req, res).catch((err) => {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err instanceof Error ? err.message : String(err) }));
    });
    return;
  }

  if (path === '/omlx-events') {
    startSseResponse(req, res);
    return;
  }

  if (path === '/abort') {
    handleAbort(req, res);
    return;
  }

  if (path === '/stop') {
    handleStop(req, res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'not found' }));
});

server.listen(PORT, HOST, () => {
  console.log(`oMLX Monitor service listening on ${HOST}:${PORT}`);
});

// Graceful shutdown.
process.on('SIGTERM', () => {
  stopSampling();
  server?.close();
  process.exit(0);
});

// Export for testing or external consumption.
export { sampler, api, sseManager };
