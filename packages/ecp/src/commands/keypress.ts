import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';

export async function keypress<Context extends Executor>(
  ctx: Context,
  payload: { key: string },
  config?: Config<Context>
): Promise<void> {
  const response = await execute(
    ctx,
    `keypress/${payload.key}`,
    undefined,
    config
  );
  await response.body?.cancel();
}
