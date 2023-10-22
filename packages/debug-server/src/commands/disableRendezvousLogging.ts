import type { Executor } from '../executors/Executor.ts';
import { execute } from '../internal/execute.js';

const pattern = /rendezvous logging is off/;

/**
 * Disable rendezvous logging.
 */
export async function disableRendezvousLogging(executor: Executor): Promise<void> {
  await execute(executor, 'logrendezvous', ['off'], [pattern]);
}
