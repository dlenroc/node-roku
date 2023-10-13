// @ts-ignore missing types
import digest from 'digest-header';
import { DeveloperServerOptions } from '../DeveloperServerOptions.ts';
import { Executor } from './Executor.ts';

export class DeveloperServerExecutor implements Executor {
  private _authentication: any;
  private readonly config: DeveloperServerOptions;

  constructor(options: DeveloperServerOptions) {
    this.config = options;
  }

  async execute(
    request: {
      method: string;
      path: string;
      form?: Record<string, string | Blob>;
    },
    options?: {
      signal?: AbortSignal;
    }
  ): Promise<{ status: number; body: Blob }> {
    let body;
    if (request.form) {
      body = new FormData();
      for (const [key, value] of Object.entries(request.form!)) {
        body.append(key, value);
      }
    }

    const response = await fetch(this.config.address + '/' + request.path, {
      method: request.method,
      headers: {
        Authorization: await this._getAuthorizationFor(
          request.method,
          request.path
        ),
      },
      body,
      signal: options?.signal
        // @ts-ignore missing types
        ? AbortSignal.any([this.config.signal, options.signal])
        : this.config.signal,
    });

    return {
      status: response.status,
      body: await response.blob(),
    };
  }

  private async _getAuthorizationFor(
    method: string,
    path: string
  ): Promise<string> {
    if (!this._authentication) {
      this._authentication = fetch(this.config.address, {
        signal: this.config.signal,
      }).then((response) => response.headers.get('WWW-Authenticate'));
    }

    return digest(
      method,
      path,
      await this._authentication,
      `${this.config.username}:${this.config.password}`
    );
  }
}
