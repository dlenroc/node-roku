import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';

export async function input<Context extends Executor>(
  ctx: Context,
  payload: Record<string, unknown>,
  config?: Config<Context>
): Promise<void> {
  await execute(ctx, 'input', payload, config);
}
