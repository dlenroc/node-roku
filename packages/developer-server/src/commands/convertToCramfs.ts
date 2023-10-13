import type { Executor } from '../executor/Executor.ts';
import { execute } from '../internal/execute.ts';
import { getPluginInstallCommand } from '../internal/getPluginInstallCommand.ts';

/**
 * Compress sideloaded channel using Cramfs.
 */
export async function convertToCramfs(ctx: Executor): Promise<void> {
  await execute(ctx, getPluginInstallCommand('Convert to cramfs'));
}
