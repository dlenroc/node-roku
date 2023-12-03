import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';

const pattern = /brightscript warning limit: (\d+)/;

/**
 * Returns the maximum number of BrightScript warnings that can be displayed
 * in the BrightScript console (port 8085).
 */
export async function getMaxWarningCount<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<number> {
  const [[result]] = await execute(
    ctx,
    'brightscript_warnings',
    [pattern],
    config
  );
  return +result[1];
}
