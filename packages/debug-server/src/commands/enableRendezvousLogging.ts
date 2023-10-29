import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';

const pattern = /rendezvous logging is on/;

/**
 * Enable rendezvous logging.
 */
export async function enableRendezvousLogging<Context extends Executor<{}>>(
  ctx: Context,
  config?: Config<Context>
): Promise<void> {
  await execute(ctx, 'logrendezvous', ['on'], [pattern], config);
}
