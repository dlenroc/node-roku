import { ECPError } from '../ECPError.js';
import type { Executor } from '../Executor.js';
import type { Nullable } from './Nullable.js';

export type Config<T> = T extends Executor<infer O> ? O : never;

export async function execute<Context extends Executor>(
  ctx: Context,
  path: string,
  params?: Nullable<Record<string, unknown>>,
  config?: Config<Context>
): Promise<Response> {
  const response = await ctx.execute(path, params, config);

  if (!response.ok) {
    throw new ECPError(`${path} -> ${response.status} ${response.statusText}`);
  }

  return response;
}
