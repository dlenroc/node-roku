import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import { toKey } from '../internal/toKey.js';
import type { Config } from '../internal/types.d.ts';
import type { Key } from '../types/Key.ts';

export async function keyup<Context extends Executor>(
  ctx: Context,
  params: { key: Key },
  config?: Config<Context>
): Promise<void> {
  await execute(ctx, `keyup/${toKey(params.key)}`, undefined, config);
}
