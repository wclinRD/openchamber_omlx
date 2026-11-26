// OMLX Admin API client. Handles authentication from environment or settings file,
// and exposes `/admin/api/activity`, `/admin/api/models`, and abort endpoints.

import type { OmlxActivityStats, OmlxRequestStatus, OmlxWaitingStatus } from '../shared/snapshot.ts';

const HOST = '127.0.0.1';
const PORT = 8000;

export interface OmlxApiConfig {
  host: string;
  port: number;
  apiKey: string;
}

export class OmlxApi {
  public readonly host: string;
  public readonly port: number;
  private apiKey: string;
  private authErrorCount = 0;

  constructor(host: string, port: number, apiKey: string) {
    this.host = host;
    this.port = port;
    this.apiKey = apiKey;
  }

  private get authHeader(): string {
    return `Bearer ${this.apiKey}`;
  }

  private url(path: string): string {
    return `http://${this.host}:${this.port}${path}`;
  }

  private async fetchJson<T>(path: string): Promise<T> {
    const res = await fetch(this.url(path), {
      headers: {
        Authorization: this.authHeader,
        Accept: 'application/json',
      },
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      if (res.status === 401) {
        this.authErrorCount++;
      }
      throw new Error(`oMLX Admin API ${path} failed: ${res.status} ${body}`);
    }
    return res.json() as Promise<T>;
  }

  public getActivity(): Promise<OmlxActivityStats> {
    return this.fetchJson<OmlxActivityStats>('/admin/api/activity');
  }

  public getModels(): Promise<unknown> {
    // Return the raw model list for future model state queries.
    return this.fetchJson('/admin/api/models');
  }

  public abortRequest(modelId: string, requestId: string): Promise<unknown> {
    return this.fetchJson(`/admin/api/models/${encodeURIComponent(modelId)}/requests/${encodeURIComponent(requestId)}/abort`);
  }

  public get authError(): boolean {
    return this.authErrorCount > 0;
  }

  public resetAuthError(): void {
    this.authErrorCount = 0;
  }
}

/**
 * Resolve the API key used by the oMLX server.
 * Priority:
 *   1. OMLX_API_KEY environment variable
 *   2. ~/.omlx/settings.json -> auth.api_key
 *   3. "1234" fallback (default if server was started without explicit key)
 */
export async function resolveOmlxApiKey(): Promise<string> {
  const envKey = process.env.OMLX_API_KEY;
  if (envKey) return envKey;

  try {
    const settingsPath = process.env.HOME ? `${process.env.HOME}/.omlx/settings.json` : '';
    if (settingsPath) {
      const fs = await import('node:fs/promises');
      const raw = await fs.readFile(settingsPath, 'utf8');
      const parsed = JSON.parse(raw);
      const key = parsed?.auth?.api_key;
      if (key) return String(key);
    }
  } catch {
    // ignore and fall through
  }

  // oMLX default key when not configured explicitly
  return '1234';
}

export async function createOmlxApi(key?: string): Promise<OmlxApi> {
  const apiKey = key ?? (await resolveOmlxApiKey());
  return new OmlxApi(HOST, PORT, apiKey);
}
