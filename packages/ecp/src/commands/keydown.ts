import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';
import { toKey } from '../internal/toKey.js';
import type { Key } from '../types/Key.js';

export async function keydown<Context extends Executor>(
  ctx: Context,
  params: { key: Key },
  config?: Config<Context>
): Promise<void> {
  await execute(ctx, `keydown/${toKey(params.key)}`, undefined, config);
}
