import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import type { RendezvousLoggingStatus } from '../types/RendezvousLoggingStatus.ts';

const pattern = /rendezvous logging is (on|off)/;

/**
 * Returns rendezvous logging status.
 */
export async function getRendezvousLoggingStatus<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<RendezvousLoggingStatus> {
  const [[result]] = await execute(ctx, 'logrendezvous', [pattern], config);
  return { enabled: result[1] === 'on' };
}
