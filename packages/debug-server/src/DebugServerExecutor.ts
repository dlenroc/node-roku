import { createConnection } from 'node:net';
import type { Executor } from './Executor.js';

type DebugServerExecutorOptions = {
  signal?: AbortSignal;
};

export class DebugServerExecutor
  implements Executor<DebugServerExecutorOptions>
{
  #hostname: string;
  #port: number;
  #signal?: AbortSignal | undefined;

  constructor(options: {
    hostname: string;
    port: number;
    signal?: AbortSignal;
  }) {
    this.#hostname = options.hostname;
    this.#port = options.port;
    this.#signal = options.signal;
  }

  async execute(
    command: string,
    args: string[],
    config?: DebugServerExecutorOptions
  ): Promise<string> {
    const signal =
      this.#signal && config?.signal
        ? // @ts-ignore TS2339: Property 'any' does not exist on type 'typeof AbortSignal'.
          AbortSignal.any([this.#signal, config.signal])
        : this.#signal || config?.signal;

    return new Promise((resolve, reject) => {
      const cmd = `${command} ${args.join(' ')}`.replace(/\s/g, ' ').trimEnd();

      const client = createConnection(
        { host: this.#hostname, port: this.#port, signal },
        () => {
          client.write(`${cmd}\nq\n`);
        }
      );

      let chunks: Buffer[] = [];

      client.on('data', (chunk) => {
        chunks.push(chunk);
      });

      client.on('end', () => {
        const response = Buffer.concat(chunks)
          .toString()
          .replace(/\r\n?/g, '\n');

        const start = response.indexOf('\n>') + 2;
        const end = response.lastIndexOf('\n>');
        resolve(response.slice(start, end).trim());
      });

      client.on('error', (error) => {
        reject(error);
      });
    });
  }
}
