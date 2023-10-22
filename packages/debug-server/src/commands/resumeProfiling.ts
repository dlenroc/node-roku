import type { Executor } from '../executors/Executor.ts';
import { execute } from '../internal/execute.js';

const pattern = /bsprof resumed/;

/**
 * Resume the generation of profiling data.
 */
export async function resumeProfiling(executor: Executor): Promise<void> {
  await execute(executor, 'bsprof-resume', [], [pattern]);
}
