import type { Executor } from '../executor/Executor.ts';
import { execute } from '../internal/execute.ts';
import { getPluginInstallCommand } from '../internal/getPluginInstallCommand.ts';

/**
 * Compress sideloaded channel using Squashfs.
 */
export async function convertToSquashfs(ctx: Executor): Promise<void> {
  await execute(ctx, getPluginInstallCommand('Convert to squashfs'));
}
