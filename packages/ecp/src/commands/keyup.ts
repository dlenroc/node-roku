import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';

export async function keyup<Context extends Executor>(
  ctx: Context,
  payload: { key: string },
  config?: Config<Context>
): Promise<void> {
  const response = await execute(
    ctx,
    `keyup/${payload.key}`,
    undefined,
    config
  );
  await response.body?.cancel();
}
