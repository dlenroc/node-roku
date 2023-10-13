import { DeveloperServerError } from '../DeveloperServerError.ts';
import type { Executor } from '../executor/Executor.ts';
import { execute } from '../internal/execute.ts';
import { getPluginInspectCommand } from '../internal/getPluginInspectCommand.ts';

/**
 * Get sideloaded channel screenshot.
 */
export async function getScreenshot(ctx: Executor): Promise<Blob> {
  const command = getPluginInspectCommand('Screenshot');
  const body = await execute(ctx, command);
  const bodyText = await body.text();
  const screenshotPath = bodyText.match(/pkgs\/dev\.(png|jpg)/)?.[0];
  if (!screenshotPath) {
    throw new DeveloperServerError({
      ...command,
      result: 'Could not find screenshot path in response body.',
    });
  }

  return execute(ctx, { method: 'GET', path: screenshotPath });
}
