import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';

const pattern = /rendezvous logging is off/;

/**
 * Disable rendezvous logging.
 */
export async function disableRendezvousLogging<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<void> {
  await execute(ctx, 'logrendezvous off', [pattern], config);
}
