import type { Executor } from './Executor.js';
import { ODCError } from './ODCError.js';

type ODCConfig = {
  address: string;
  signal?: AbortSignal;
};

type ODCExecutorConfig = {
  signal?: AbortSignal;
};

export class ODCExecutor implements Executor<ODCExecutorConfig> {
  #config: ODCConfig;

  constructor(config: ODCConfig) {
    this.#config = config;
  }

  async execute(
    request: {
      method: string;
      path: string;
      headers?: null | undefined | Record<string, string>;
      params?: null | undefined | Record<string, unknown>;
      data?: null | undefined | RequestInit['body'];
    },
    config?: ODCExecutorConfig
  ): Promise<Response> {
    const signal =
      this.#config.signal && config?.signal
        ? // @ts-ignore
          AbortSignal.any([this.#config.signal, config.signal])
        : this.#config.signal || config?.signal;

    let path = request.path;

    if (request.params) {
      const params = Object.entries(request.params).reduce(
        (result, [key, value]) => {
          result[key] = ['string', 'number', 'boolean'].includes(typeof value)
            ? value
            : JSON.stringify(value);
          return result;
        },
        {} as Record<string, any>
      );

      path += '?' + new URLSearchParams(params);
    }

    const requestInit: RequestInit = {
      signal,
      method: request.method,
    };

    if (request.headers) {
      requestInit.headers = request.headers;
    }

    if (request.data) {
      requestInit.body = request.data;
    }

    const response = await fetch(
      this.#config.address + '/' + path,
      requestInit
    );

    if (!response.ok) {
      const json: any = await response.json();

      let trace = json.backtrace?.reverse() || [];
      let message =
        json.message || `${request.method} /${path} -> ${response.status}`;
      let error = message;

      if (trace.length) {
        error += '\n    at ';
        error += trace
          .map(
            (trace: any) =>
              trace.function.replace(/\(.+/, '') +
              ' (' +
              trace.filename +
              ':' +
              trace.line_number +
              ')'
          )
          .join('\n    at ');
      }

      throw new ODCError(error);
    }

    return response;
  }
}
