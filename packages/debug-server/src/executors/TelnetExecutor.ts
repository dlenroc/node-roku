import { createConnection } from 'node:net';
import { DebugServerError } from '../DebugServerError.ts';
import { Executor } from './Executor.ts';

class TelnetExecutor implements Executor {
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
    this.#signal = options.signal;
  }

  async execute(command: string, args?: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
      const cmd = `${command} ${(args || []).join(' ')}`.replace(/\s/g, ' ').trimEnd();

      const client = createConnection(
        { host: this.#hostname, port: this.#port, signal: this.#signal },
        () => {
          client.write(`${cmd}\nq\n`);
        }
      );

      client.setTimeout(5e3, () => {
        client.destroy(
          new DebugServerError(
            `Inactivity timeout exceeded during execution of '${cmd}' command, ` +
              `make sure the device is available on the network and there is ` +
              `no other active telnet connection with '${this.#hostname}:${this.#port}'`
          )
        );
      });

      let chunks: Buffer[] = [];
      client.on('data', (chunk) => {
        chunks.push(chunk);
      });

      client.on('end', () => {
        const response = Buffer.concat(chunks).toString().replace(/\r/g, '');
        resolve(
          response
            .slice(response.indexOf('\n>') + 2, response.lastIndexOf('\n>'))
            .trim()
        );
      });

      client.on('error', (error) => {
        reject(error);
      });

      client.on('close', () => {
        client.destroy();
        client.removeAllListeners();
      });
    });
  }
}
