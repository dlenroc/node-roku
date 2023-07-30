import type { Executor } from '../executors/Executor.ts';
import { execute } from '../internal/execute.ts';

const pattern = /brightscript warning limit: (\d+)/;

/**
 * Returns the maximum number of BrightScript warnings that can be displayed
 * in the BrightScript console (port 8085).
 */
export async function getMaxWarningCount(executor: Executor): Promise<number> {
  const [[result]] = await execute(executor, 'brightscript_warnings', [], [pattern]);
  return +result[1];
}
