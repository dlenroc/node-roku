import type { Executor } from '../executor/Executor.ts';
import { execute } from '../internal/execute.ts';
import { getPluginPackageCommand } from '../internal/getPluginPackageCommand.ts';

/**
 * Delete sideloaded channel package.
 */
export async function deletePackage(ctx: Executor): Promise<void> {
  await execute(ctx, getPluginPackageCommand('Delete'));
}
