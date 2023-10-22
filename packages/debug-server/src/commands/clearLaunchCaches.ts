import type { Executor } from '../executors/Executor.ts';
import { execute } from '../internal/execute.js';

const pattern = /Done/;

/**
 * Clear all caches that can affect channel launch time.
 */
export async function clearLaunchCaches(executor: Executor): Promise<void> {
  await execute(executor, 'clear_launch_caches', [], [pattern]);
}
