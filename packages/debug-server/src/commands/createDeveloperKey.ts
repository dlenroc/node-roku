import type { Executor } from '../executors/Executor.ts';
import { execute } from '../internal/execute.ts';
import { DeveloperKey } from '../types/DeveloperKey.ts';

const idPattern = /DevID: (.*)/;
const passwordPattern = /Password: (.*)/;

/**
 * Generate a new developer key.
 */
export async function createDeveloperKey(executor: Executor): Promise<DeveloperKey> {
  const result = await execute(executor, 'genkey', [], [idPattern, passwordPattern]);
  return { id: result[0][0][1], password: result[1][0][1] };
}
