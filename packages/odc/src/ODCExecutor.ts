import type { Executor } from './Executor.ts';
import type { ODCOptions } from './ODCOptions.ts';
import type { Mixed } from './internal/types.d.ts';

export class ODCExecutor implements Executor<ODCOptions> {
  #address: string;
  #signal?: AbortSignal;

  constructor(config: { address: string; signal?: AbortSignal }) {
    this.#address = config.address;
    this.#signal = config.signal!;
  }

  async execute(
    path: string,
    init?: Mixed<RequestInit, ODCOptions>
  ): Promise<Response> {
    const signal =
      this.#signal && init?.signal
        ? // @ts-ignore TS2339: Property 'any' does not exist on type 'typeof AbortSignal'.
          AbortSignal.any([this.#signal, init.signal])
        : this.#signal || init?.signal;

    return fetch(this.#address + path, { ...init, signal });
  }
}
