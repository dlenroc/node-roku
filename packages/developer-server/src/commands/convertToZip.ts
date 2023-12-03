import type { Executor } from '../Executor.ts';
import { executePluginInstallCommand } from '../internal/executePluginInstallCommand.js';
import type { Config } from '../internal/types.d.ts';

/**
 * Compress sideloaded channel using Zip.
 */
export async function convertToZip<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<void> {
  await executePluginInstallCommand(ctx, 'Convert to zip', config);
}
