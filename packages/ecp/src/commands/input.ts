import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';

export async function input<Context extends Executor>(
  ctx: Context,
  payload: Record<string, unknown>,
  config?: Config<Context>
): Promise<void> {
  const response = await execute(ctx, 'input', payload, config);
  await response.body?.cancel();
}
