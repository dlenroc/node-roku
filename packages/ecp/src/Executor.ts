import type { Nullable } from "./internal/Nullable.js";

export interface Executor<Config = {}> {
  execute(
    path: string,
    params?: Nullable<Record<string, unknown>>,
    config?: Config
  ): Promise<Response>;
}
