import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';

const pattern = /bsprof paused/;

/**
 * Pause the generation of profiling data.
 */
export async function pauseProfiling<Context extends Executor<{}>>(
  ctx: Context,
  config?: Config<Context>
): Promise<void> {
  await execute(ctx, 'bsprof-pause', [], [pattern], config);
}
