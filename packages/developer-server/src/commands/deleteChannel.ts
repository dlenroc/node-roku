import type { Executor } from '../executor/Executor.ts';
import { execute } from '../internal/execute.js';
import { getPluginInstallCommand } from '../internal/getPluginInstallCommand.js';

/**
 * Delete sideloaded channel.
 */
export async function deleteChannel(ctx: Executor): Promise<void> {
  await execute(ctx, getPluginInstallCommand('Delete'));
}
