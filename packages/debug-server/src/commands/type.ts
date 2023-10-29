import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';

const pattern = /^\s*$/;

/**
 * Send a literal text sequence.
 */
export async function type<Context extends Executor<{}>>(
  ctx: Context,
  payload: {
    /**
     * Text to type.
     */
    text: string;
  },
  config?: Config<Context>
): Promise<void> {
  await execute(ctx, 'type', [payload.text], [pattern], config);
}
