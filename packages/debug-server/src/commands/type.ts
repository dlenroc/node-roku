import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';

const pattern = /^\s*$/;

/**
 * Send a literal text sequence.
 */
export async function type<Context extends Executor>(
  ctx: Context,
  payload: {
    /**
     * Text to type.
     */
    text: string;
  },
  config?: Config<Context>
): Promise<void> {
  await execute(
    ctx,
    `type${payload.text ? ` ${payload.text}` : ''}`,
    [pattern],
    config
  );
}
