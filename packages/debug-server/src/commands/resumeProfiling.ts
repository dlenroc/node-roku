import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';

const pattern = /bsprof resumed/;

/**
 * Resume the generation of profiling data.
 */
export async function resumeProfiling<Context extends Executor<{}>>(
  ctx: Context,
  config?: Config<Context>
): Promise<void> {
  await execute(ctx, 'bsprof-resume', [], [pattern], config);
}
