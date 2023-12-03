import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import type { Params } from '../types/Params.ts';

export async function search<Context extends Executor>(
  ctx: Context,
  params: Params,
  config?: Config<Context>
): Promise<void> {
  await execute(ctx, 'search/browse', params, config);
}
