import type { ECPExecutorOptions } from './ECPExecutorOptions.ts';
import type { Executor } from './Executor.ts';
import type { Mixed } from './internal/types.d.ts';

export class ECPExecutor implements Executor<ECPExecutorOptions> {
  #address: string;
  #signal?: AbortSignal;

  constructor(options: { address: string; signal?: AbortSignal }) {
    this.#address = options.address;
    this.#signal = options.signal!;
  }

  async execute(
    path: string,
    init?: Mixed<RequestInit, ECPExecutorOptions>
  ): Promise<Response> {
    const signal =
      this.#signal && init?.signal
        ? // @ts-ignore TS2339: Property 'any' does not exist on type 'typeof AbortSignal'.
          AbortSignal.any([this.#signal, init.signal])
        : this.#signal || init?.signal;

    return fetch(this.#address + '/' + path, { ...init, signal });
  }
}
