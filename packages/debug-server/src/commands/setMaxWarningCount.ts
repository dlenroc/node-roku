import type { Executor } from '../executors/Executor.ts';
import { execute } from '../internal/execute.ts';

const pattern = /updated brightscript warning limit to (\d+)/;

/**
 * Sets the maximum number of BrightScript warnings to display in the BrightScript console (port 8085).
 */
export async function setMaxWarningCount(executor: Executor, count: number): Promise<number> {
  const [[result]] = await execute(executor, 'brightscript_warnings', [`${count}`], [pattern]);
  return +result[1];
}
