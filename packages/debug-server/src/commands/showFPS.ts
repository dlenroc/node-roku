import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';

const pattern = /^\s*$/;

/**
 * Show onscreen graphics statistics.
 */
export async function showFPS<Context extends Executor<{}>>(
  ctx: Context,
  config?: Config<Context>
): Promise<void> {
  await execute(ctx, 'fps_display', ['1'], [pattern], config);
}
