import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';

const pattern = /Done/;

/**
 * Clear all caches that can affect channel launch time.
 */
export async function clearLaunchCaches<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<void> {
  await execute(ctx, 'clear_launch_caches', [pattern], config);
}
