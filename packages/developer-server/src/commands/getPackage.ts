import { DeveloperServerError } from '../DeveloperServerError.js';
import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';
import { getPluginPackageCommand } from '../internal/getPluginPackageCommand.js';

/**
 * Get sideloaded channel package.
 */
export async function getPackage<Context extends Executor<{}>>(
  ctx: Context,
  config?: Config<Context>
): Promise<Blob> {
  const command = getPluginPackageCommand();
  const body = await execute(ctx, command, config);
  const bodyText = await body.text();
  const pkgPath = bodyText.match(/pkgs\/.+?\.pkg/)?.[0];
  if (!pkgPath) {
    throw new DeveloperServerError({
      message: 'Package not found',
      params: command.body,
      path: command.path,
      output: bodyText,
    });
  }

  return execute(ctx, { path: pkgPath }, config);
}
