import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';

const pattern = /rendezvous logging is off/;

/**
 * Disable rendezvous logging.
 */
export async function disableRendezvousLogging<Context extends Executor<{}>>(
  ctx: Context,
  config?: Config<Context>
): Promise<void> {
  await execute(ctx, 'logrendezvous', ['off'], [pattern], config);
}
