import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';
import { getPluginPackageCommand } from '../internal/getPluginPackageCommand.js';

/**
 * Delete sideloaded channel package.
 */
export async function deletePackage<Context extends Executor<{}>>(
  ctx: Context,
  config?: Config<Context>
): Promise<void> {
  await execute(ctx, getPluginPackageCommand('Delete'), config);
}
