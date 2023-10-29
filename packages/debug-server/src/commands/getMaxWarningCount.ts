import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';

const pattern = /brightscript warning limit: (\d+)/;

/**
 * Returns the maximum number of BrightScript warnings that can be displayed
 * in the BrightScript console (port 8085).
 */
export async function getMaxWarningCount<Context extends Executor<{}>>(
  ctx: Context,
  config?: Config<Context>
): Promise<number> {
  const [[result]] = await execute(
    ctx,
    'brightscript_warnings',
    [],
    [pattern],
    config
  );
  return +result[1];
}
