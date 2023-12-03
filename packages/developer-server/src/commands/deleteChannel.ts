import type { Executor } from '../Executor.ts';
import { executePluginInstallCommand } from '../internal/executePluginInstallCommand.js';
import type { Config } from '../internal/types.d.ts';

/**
 * Delete sideloaded channel.
 */
export async function deleteChannel<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<void> {
  await executePluginInstallCommand(ctx, 'Delete', config);
}
