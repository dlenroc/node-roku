import type { Executor } from '../Executor.ts';
import { executePluginInspectCommand } from '../internal/executePluginInspectCommand.js';
import type { Config } from '../internal/types.d.ts';

/**
 * Takes a screenshot of the sideloaded channel and returns the path to the image.
 */
export async function takeScreenshot<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<string | null> {
  const body = await executePluginInspectCommand(ctx, 'Screenshot', config);
  return body.match(/pkgs\/dev\.(png|jpg)/)?.[0] ?? null;
}
