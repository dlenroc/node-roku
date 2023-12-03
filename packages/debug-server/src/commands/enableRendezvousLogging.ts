import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';

const pattern = /rendezvous logging is on/;

/**
 * Enable rendezvous logging.
 */
export async function enableRendezvousLogging<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<void> {
  await execute(ctx, 'logrendezvous on', [pattern], config);
}
