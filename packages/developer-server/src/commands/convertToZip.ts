import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';
import { getPluginInstallCommand } from '../internal/getPluginInstallCommand.js';

/**
 * Compress sideloaded channel using Zip.
 */
export async function convertToZip<Context extends Executor<{}>>(
  ctx: Context,
  config?: Config<Context>
): Promise<void> {
  await execute(ctx, getPluginInstallCommand('Convert to zip'), config);
}
