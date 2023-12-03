import { connect } from 'node:net';
import { Readable } from 'node:stream';
import type { DebugServerExecutorOptions } from './DebugServerExecutorOptions.ts';
import type { Executor } from './Executor.ts';

export class DebugServerExecutor
  implements Executor<DebugServerExecutorOptions>
{
  #hostname: string;
  #port: number;
  #signal?: AbortSignal;

  constructor(options: {
    hostname: string;
    port: number;
    signal?: AbortSignal;
  }) {
    this.#hostname = options.hostname;
    this.#port = options.port;
    this.#signal = options.signal!;
  }

  async execute(
    command: string,
    config?: DebugServerExecutorOptions
  ): Promise<string> {
    const signal =
      this.#signal && config?.signal
        ? // @ts-ignore TS2339: Property 'any' does not exist on type 'typeof AbortSignal'.
          AbortSignal.any([this.#signal, config.signal])
        : this.#signal || config?.signal;

    const socket = connect(
      { host: this.#hostname, port: this.#port, signal },
      () => {
        socket.write(`${command}\nq\n`);
      }
    );

    const result = await new Response(Readable.toWeb(socket)).text();

    return result
      .slice(result.indexOf('\n>') + 2, result.lastIndexOf('\n>'))
      .trim();
  }
}
