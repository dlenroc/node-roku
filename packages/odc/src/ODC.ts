import { URLSearchParams } from 'url';
import { ODCError } from './ODCError';
import fetch from './internal/keep-alive-fetch';
import extend from './odc/index';

export class ODC {
  private readonly baseUrl: string;

  constructor(ip: string) {
    this.baseUrl = `http://${ip}:8061`;
  }

  async extend(app: Buffer): Promise<Buffer> {
    return await extend(app);
  }

  async getAppUI(fields?: Record<string, string[]>): Promise<string> {
    return await this.request('GET', `app-ui`, { ...(fields && { fields }) });
  }

  async getRegistry(): Promise<Record<string, Record<string, string>>> {
    return await this.request('GET', `registry`);
  }

  async patchRegistry(changes: Record<string, null | Record<string, any>>): Promise<void> {
    await this.request('PATCH', `registry`, changes);
  }

  async clearRegistry(): Promise<void> {
    await this.request('DELETE', `registry`);
  }

  private async request<T extends string | Buffer | any>(method: string, path: string, params?: Record<string, any>): Promise<T> {
    let body;
    let headers;

    if (params) {
      if (method === 'GET') {
        const qs: Record<string, any> = {};
        const entries = Object.entries(params);
        for (const [key, value] of entries) {
          if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            qs[key] = value;
          } else {
            qs[key] = JSON.stringify(value);
          }
        }

        if (entries.length) {
          path += '?' + new URLSearchParams(qs);
        }
      } else {
        body = JSON.stringify(params);
        headers = { 'Content-Type': 'application/json' };
      }
    }
    console.log(this.baseUrl + '/' + path);
    const response = await fetch(this.baseUrl + '/' + path, { method, headers, body });

    if (!response.ok) {
      const json = await response.json();

      let trace = json.backtrace?.reverse() || [];
      let message = json.message || `${method} /${path} -> ${response.status}`;
      let error = message;

      if (trace.length) {
        error += '\n    at ';
        error += trace.map((trace: any) => trace.function.replace(/\(.+/, '') + ' (' + trace.filename + ':' + trace.line_number + ')').join('\n    at ');
      }

      throw new ODCError(error);
    }

    if (response.headers.get('Content-Length') === '0') {
      return undefined as T;
    }

    const contentType = response.headers.get('Content-Type');

    if (contentType?.includes('json')) {
      return response.json() as Promise<T>;
    }

    if (contentType?.startsWith('text/')) {
      return response.text() as Promise<T>;
    }

    return response.buffer() as Promise<T>;
  }
}
