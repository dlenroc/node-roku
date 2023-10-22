import type { Executor } from '../executors/Executor.ts';
import { execute } from '../internal/execute.js';

const pattern = /rendezvous logging is on/;

/**
 * Enable rendezvous logging.
 */
export async function enableRendezvousLogging(executor: Executor): Promise<void> {
  await execute(executor, 'logrendezvous', ['on'], [pattern]);
}
