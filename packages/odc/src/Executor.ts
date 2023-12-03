import type { Mixed } from './internal/types.d.ts';

export interface Executor<Config = {}> {
  execute(path: string, init?: Mixed<RequestInit, Config>): Promise<Response>;
}
