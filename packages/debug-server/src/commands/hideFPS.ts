import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';

const pattern = /^\s*$/;

/**
 * Hide onscreen graphics statistics.
 */
export async function hideFPS<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<void> {
  await execute(ctx, 'fps_display 0', [pattern], config);
}
