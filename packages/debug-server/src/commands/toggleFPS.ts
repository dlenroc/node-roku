import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';

const pattern = /^\s*$/;

/**
 * Toggle onscreen graphics statistics.
 */
export async function toggleFPS<Context extends Executor<{}>>(
  ctx: Context,
  config?: Config<Context>
): Promise<void> {
  await execute(ctx, 'fps_display', [], [pattern], config);
}
