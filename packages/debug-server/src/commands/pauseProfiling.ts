import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';

const pattern = /bsprof paused/;

/**
 * Pause the generation of profiling data.
 */
export async function pauseProfiling<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<void> {
  await execute(ctx, 'bsprof-pause', [pattern], config);
}
