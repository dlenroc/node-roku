import type { Executor } from '../Executor.ts';
import { executePluginPackageCommand } from '../internal/executePluginPackageCommand.js';
import type { Config } from '../internal/types.d.ts';

/**
 * Delete sideloaded channel package.
 */
export async function deletePackage<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<void> {
  await executePluginPackageCommand(ctx, 'Delete', config);
}
