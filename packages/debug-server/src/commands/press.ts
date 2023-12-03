import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';

const pattern = /^\s*$/;

/**
 * Simulate a keypress.
 */
export async function press<Context extends Executor>(
  ctx: Context,
  payload: {
    /**
     * Keys to press.
     */
    keys: string;
  },
  config?: Config<Context>
): Promise<void> {
  await execute(
    ctx,
    `press${payload.keys ? ` ${payload.keys}` : ''}`,
    [pattern],
    config
  );
}
