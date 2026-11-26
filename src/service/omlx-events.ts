// Manages SSE clients for live oMLX status updates. Compares consecutive snapshots
// and emits only changed events.

import http from 'node:http';

import type { OmlxEvent, OmlxEventKind } from '../shared/snapshot.ts';
import type { OmlxModelStatus } from '../shared/snapshot.ts';

export class OmlxSseManager {
  private clients = new Set<http.ServerResponse>();
  private lastSnapshot: Map<string, OmlxModelStatus> = new Map();

  public addClient(res: http.ServerResponse): void {
    this.clients.add(res);
    res.on('close', () => this.clients.delete(res));
  }

  public removeClient(res: http.ServerResponse): void {
    this.clients.delete(res);
  }

  public pushSnapshotEvent(
    prevSnapshot: { at: number; omlx: { active_models: OmlxModelStatus[] } } | null,
    nextSnapshot: { at: number; omlx: { active_models: OmlxModelStatus[] } }
  ): void {
    const { at, omlx } = nextSnapshot;
    const currentMap = new Map(omlx.active_models.map((m) => [m.id, m]));

    if (prevSnapshot) {
      const prevMap = new Map(prevSnapshot.omlx.active_models.map((m) => [m.id, m]));

      // Detect load/unload changes
      for (const [id, next] of currentMap) {
        const prev = prevMap.get(id);
        if (prev && prev.loaded !== next.loaded) {
          const kind: OmlxEventKind = next.loaded ? 'model-load' : 'model-unload';
          this.pushEvent({ kind, at, model_id: id, request_id: null, data: { state: next.state } });
        } else if (!prev && next.loaded) {
          this.pushEvent({ kind: 'model-load', at, model_id: id, request_id: null, data: { state: next.state } });
        }
      }
      for (const id of prevMap.keys()) {
        if (!currentMap.has(id)) {
          this.pushEvent({ kind: 'model-unload', at, model_id: id, request_id: null, data: {} });
        }
      }

      // Detect active request changes
      for (const [id, next] of currentMap) {
        const prev = prevMap.get(id);
        if (!prev) continue;
        this.compareRequests(id, prev.prefilling as Array<unknown>, next.prefilling as Array<unknown>, 'prefill-progress', at);
        this.compareRequests(id, prev.generating as Array<unknown>, next.generating as Array<unknown>, 'generate-tokens', at);
        this.compareRequests(id, prev.waiting as Array<unknown>, next.waiting as Array<unknown>, 'chat-start', at);
      }
    } else {
      // First snapshot: report all active requests as new
      for (const m of omlx.active_models) {
        for (const req of m.prefilling) {
          this.pushEvent({ kind: 'prefill-progress', at, model_id: m.id, request_id: req.request_id, data: { processed: req.processed, total: req.total } });
        }
        for (const req of m.generating) {
          this.pushEvent({ kind: 'generate-tokens', at, model_id: m.id, request_id: req.request_id, data: { generated_tokens: req.generated_tokens } });
        }
        for (const req of m.waiting) {
          this.pushEvent({ kind: 'chat-start', at, model_id: m.id, request_id: req.request_id, data: { queue_position: req.queue_position } });
        }
      }
    }

    this.lastSnapshot = currentMap;
  }

  private compareRequests(
    modelId: string,
    prev: Array<unknown>,
    next: Array<unknown>,
    eventKind: OmlxEventKind,
    at: number
  ): void {
    const prevMap = new Map<string, unknown>(prev.map((r) => {
      const rec = r as { request_id: string; [k: string]: unknown };
      return [rec.request_id, r] as const;
    }));
    const nextMap = new Map<string, unknown>(next.map((r) => {
      const rec = r as { request_id: string; [k: string]: unknown };
      return [rec.request_id, r] as const;
    }));

    for (const [id, nextReq] of nextMap) {
      const prevReq = prevMap.get(id);
      if (!prevReq) {
        this.pushEvent({ kind: eventKind, at, model_id: modelId, request_id: id, data: nextReq as Record<string, unknown> });
      } else {
        // Check if meaningful fields changed
        const changed = this.hasMeaningfulChange(prevReq as Record<string, unknown>, nextReq as Record<string, unknown>, eventKind);
        if (changed) {
          this.pushEvent({ kind: eventKind, at, model_id: modelId, request_id: id, data: nextReq as Record<string, unknown> });
        }
      }
    }

    for (const id of prevMap.keys()) {
      if (!nextMap.has(id)) {
        // Request ended: if generating, may be chat-end; otherwise ignore
        const prevReq = prevMap.get(id)!;
        if (eventKind === 'generate-tokens') {
          this.pushEvent({ kind: 'chat-end', at, model_id: modelId, request_id: id, data: prevReq as Record<string, unknown> });
        }
      }
    }
  }

  private hasMeaningfulChange(
    prev: Record<string, unknown>,
    next: Record<string, unknown>,
    kind: OmlxEventKind
  ): boolean {
    if (kind === 'prefill-progress') {
      return next.processed !== prev.processed || next.total !== prev.total || next.speed !== prev.speed || next.eta !== prev.eta;
    }
    if (kind === 'generate-tokens') {
      return next.generated_tokens !== prev.generated_tokens || next.tokens_per_second !== prev.tokens_per_second;
    }
    if (kind === 'chat-start') {
      return next.queue_position !== prev.queue_position || next.elapsed_seconds !== prev.elapsed_seconds;
    }
    return false;
  }

  private pushEvent(event: OmlxEvent): void {
    const data = JSON.stringify(event);
    for (const client of this.clients) {
      try {
        client.write(`event: omlx\n`);
        client.write(`data: ${data}\n\n`);
      } catch {
        this.clients.delete(client);
      }
    }
  }
}
