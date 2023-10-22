import type { Executor } from '../executors/Executor.ts';
import { execute } from '../internal/execute.js';

const pattern = /bsprof paused/;

/**
 * Pause the generation of profiling data.
 */
export async function pauseProfiling(executor: Executor): Promise<void> {
  await execute(executor, 'bsprof-pause', [], [pattern]);
}
