import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';
import type { Params } from '../types/Params.js';

export async function input<Context extends Executor>(
  ctx: Context,
  params: Params,
  config?: Config<Context>
): Promise<void> {
  await execute(ctx, 'input', params, config);
}
