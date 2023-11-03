// @ts-ignore missing types
import digest from 'digest-header';
import type { DeveloperServerOptions } from './DeveloperServerOptions.js';
import type { Executor } from './Executor.js';

type DeveloperServerExecutorOptions = {
  signal?: AbortSignal;
};

export class DeveloperServerExecutor
  implements Executor<DeveloperServerExecutorOptions>
{
  private _authentication: any;
  private readonly config: DeveloperServerOptions;

  constructor(options: DeveloperServerOptions) {
    this.config = options;
  }

  async execute(
    command: string | { path: string; body?: Record<string, string | Blob> },
    options?: DeveloperServerExecutorOptions
  ): Promise<{ status: number; body: Blob }> {
    command = typeof command === 'string' ? { path: command } : command;

    let body;
    if (command.body) {
      body = new FormData();
      for (const [key, value] of Object.entries(command.body)) {
        body.append(key, value);
      }
    }

    const method = command.body ? 'POST' : 'GET';
    const response = await fetch(this.config.address + '/' + command.path, {
      method,
      headers: {
        Authorization: await this._getAuthorizationFor(method, command.path),
      },
      ...(body && { body }),
      signal: options?.signal
        ? // @ts-ignore missing types
          AbortSignal.any([this.config.signal, options.signal])
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
      const signal = this.config.signal;
      this._authentication = fetch(
        this.config.address,
        signal ? { signal } : {}
      ).then((response) => response.headers.get('WWW-Authenticate'));
    }

    return digest(
      method,
      path,
      await this._authentication,
      `${this.config.username}:${this.config.password}`
    );
  }
}
