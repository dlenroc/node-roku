/// <reference types="node" />

export interface Executor<Config = {}> {
  execute(
    request: {
      method: string;
      path: string;
      headers?: null | undefined | Record<string, string>;
      params?: null | undefined | Record<string, unknown>;
      data?: null | undefined | RequestInit['body'];
    },
    config?: Config
  ): Promise<Response>;
}
