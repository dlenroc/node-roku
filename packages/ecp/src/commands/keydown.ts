import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';

export async function keydown<Context extends Executor>(
  ctx: Context,
  payload: { key: string },
  config?: Config<Context>
): Promise<void> {
  await execute(ctx, `keydown/${payload.key}`, undefined, config);
}
