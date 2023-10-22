import type { Executor } from '../executor/Executor.ts';
import { execute } from '../internal/execute.js';
import { getPluginPackageCommand } from '../internal/getPluginPackageCommand.js';

/**
 * Delete sideloaded channel package.
 */
export async function deletePackage(ctx: Executor): Promise<void> {
  await execute(ctx, getPluginPackageCommand('Delete'));
}
