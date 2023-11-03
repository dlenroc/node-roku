import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';
import { getPluginInstallCommand } from '../internal/getPluginInstallCommand.js';

/**
 * Compress sideloaded channel using Squashfs.
 */
export async function convertToSquashfs<Context extends Executor<{}>>(
  ctx: Context,
  config?: Config<Context>
): Promise<void> {
  await execute(ctx, getPluginInstallCommand('Convert to squashfs'), config);
}
