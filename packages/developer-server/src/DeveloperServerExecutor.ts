// @ts-ignore missing types
import digest from 'digest-header';
import type { DeveloperServerExecutorOptions } from './DeveloperServerExecutorOptions.ts';
import type { Executor } from './Executor.ts';
import type { Mixed } from './internal/types.d.ts';

export class DeveloperServerExecutor
  implements Executor<DeveloperServerExecutorOptions>
{
  #address: string;
  #username: string;
  #password: string;
  #signal?: AbortSignal;
  #wwwAuthenticate?: Promise<string | null> | null;

  constructor(options: {
    address: string;
    username: string;
    password: string;
    signal?: AbortSignal;
  }) {
    this.#address = options.address;
    this.#username = options.username;
    this.#password = options.password;
    this.#signal = options.signal!;
  }

  async execute(
    path: string,
    init?: Mixed<RequestInit, DeveloperServerExecutorOptions>
  ): Promise<Response> {
    const signal =
      this.#signal && init?.signal
        ? // @ts-ignore TS2339: Property 'any' does not exist on type 'typeof AbortSignal'.
          AbortSignal.any([this.#signal, init.signal])
        : this.#signal || init?.signal;

    if (!this.#wwwAuthenticate) {
      this.#wwwAuthenticate = fetch(this.#address, { signal: this.#signal! })
        .then((it) => (it.body?.cancel(), it.headers.get('WWW-Authenticate')))
        .catch(() => (this.#wwwAuthenticate = null));
    }

    return fetch(this.#address + '/' + path, {
      ...init,
      ...(signal && { signal }),
      headers: {
        ...init?.headers,
        Authorization: digest(
          init?.method || 'GET',
          path,
          await this.#wwwAuthenticate,
          `${this.#username}:${this.#password}`
        ),
      },
    });
  }
}
