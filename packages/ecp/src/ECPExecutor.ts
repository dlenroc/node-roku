import type { Executor } from './Executor.js';

type ECPConfig = {
  address: string;
  signal?: AbortSignal;
};

type ECPExecutorConfig = {
  signal?: AbortSignal;
};

export class ECPExecutor implements Executor<ECPExecutorConfig> {
  #config: ECPConfig;

  constructor(config: ECPConfig) {
    this.#config = config;
  }

  async execute(
    path: string,
    params?: Record<string, string>,
    config?: ECPExecutorConfig
  ): Promise<Response> {
    if (params && Object.keys(params).length) {
      params = Object.entries(params).reduce((result, [key, value]) => {
        result[key] = ['string', 'number', 'boolean'].includes(typeof value)
          ? value
          : JSON.stringify(value);
        return result;
      }, {} as Record<string, any>);

      path += '?' + new URLSearchParams(params);
    }

    const method = path.startsWith('query/') ? 'GET' : 'POST';
    const signal =
      this.#config.signal && config?.signal
        ? // @ts-ignore
          AbortSignal.any([this.#config.signal, config.signal])
        : this.#config.signal || config?.signal;

    return fetch(this.#config.address + '/' + path, {
      method,
      signal,
    });
  }
}
