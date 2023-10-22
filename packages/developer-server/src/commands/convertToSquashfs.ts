import type { Executor } from '../executor/Executor.ts';
import { execute } from '../internal/execute.js';
import { getPluginInstallCommand } from '../internal/getPluginInstallCommand.js';

/**
 * Compress sideloaded channel using Squashfs.
 */
export async function convertToSquashfs(ctx: Executor): Promise<void> {
  await execute(ctx, getPluginInstallCommand('Convert to squashfs'));
}
