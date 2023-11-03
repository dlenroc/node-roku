import { DeveloperServerError } from '../DeveloperServerError.js';
import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';
import { getPluginInspectCommand } from '../internal/getPluginInspectCommand.js';

/**
 * Get sideloaded channel screenshot.
 */
export async function getScreenshot<Context extends Executor<{}>>(
  ctx: Context,
  config?: Config<Context>
): Promise<Blob> {
  const command = getPluginInspectCommand('Screenshot');
  const body = await execute(ctx, command, config);
  const bodyText = await body.text();
  const screenshotPath = bodyText.match(/pkgs\/dev\.(png|jpg)/)?.[0];
  if (!screenshotPath) {
    throw new DeveloperServerError({
      message: 'Screenshot not found',
      path: command.path,
      params: command.body,
      output: bodyText,
    });
  }

  return execute(ctx, { path: screenshotPath }, config);
}
