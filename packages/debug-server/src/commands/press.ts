import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';

const pattern = /^\s*$/;

/**
 * Simulate a keypress.
 */
export async function press<Context extends Executor<{}>>(
  ctx: Context,
  payload: {
    /**
     * Keys to press.
     */
    keys: string;
  },
  config?: Config<Context>
): Promise<void> {
  await execute(ctx, 'press', [payload.keys], [pattern], config);
}
