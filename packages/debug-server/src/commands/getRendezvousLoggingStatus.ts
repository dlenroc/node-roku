import type { Executor } from '../executors/Executor.ts';
import { execute } from '../internal/execute.ts';
import { RendezvousLoggingStatus } from '../types/RendezvousLoggingStatus.ts';

const pattern = /rendezvous logging is (on|off)/;

/**
 * Returns rendezvous logging status.
 */
export async function getRendezvousLoggingStatus(executor: Executor): Promise<RendezvousLoggingStatus> {
  const [[result]] = await execute(executor, 'logrendezvous', [], [pattern]);
  return { enabled: result[1] === 'on' };
}
