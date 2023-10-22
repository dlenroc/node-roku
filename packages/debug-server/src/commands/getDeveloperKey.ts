import type { Executor } from '../executors/Executor.ts';
import { execute } from '../internal/execute.js';

const pattern = /Dev ID: (.+)/;

/**
 * Returns current developer key.
 */
export async function getDeveloperKey(executor: Executor): Promise<string> {
  const [[result]] = await execute(executor, 'showkey', [], [pattern]);
  return result[1];
}
