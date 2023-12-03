import type { Executor } from '../Executor.ts';
import { executePluginInstallCommand } from '../internal/executePluginInstallCommand.js';
import type { Config } from '../internal/types.d.ts';

/**
 * Compress sideloaded channel using Squashfs.
 */
export async function convertToSquashfs<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<void> {
  await executePluginInstallCommand(ctx, 'Convert to squashfs', config);
}
