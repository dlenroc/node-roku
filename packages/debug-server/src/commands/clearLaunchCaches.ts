import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';

const pattern = /Done/;

/**
 * Clear all caches that can affect channel launch time.
 */
export async function clearLaunchCaches<Context extends Executor<{}>>(
  ctx: Context,
  config?: Config<Context>
): Promise<void> {
  await execute(ctx, 'clear_launch_caches', [], [pattern], config);
}
