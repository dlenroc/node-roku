import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';

const pattern = /bsprof resumed/;

/**
 * Resume the generation of profiling data.
 */
export async function resumeProfiling<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<void> {
  await execute(ctx, 'bsprof-resume', [pattern], config);
}
