import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';

const pattern = /updated brightscript warning limit to (\d+)/;

/**
 * Sets the maximum number of BrightScript warnings to display in the BrightScript console (port 8085).
 */
export async function setMaxWarningCount<Context extends Executor<{}>>(
  ctx: Context,
  payload: {
    /**
     * Maximum number of BrightScript warnings to display.
     */
    count: number;
  },
  config?: Config<Context>
): Promise<number> {
  const [[result]] = await execute(
    ctx,
    'brightscript_warnings',
    [`${payload.count}`],
    [pattern],
    config
  );
  return +result[1];
}
