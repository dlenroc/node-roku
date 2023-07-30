import { Executor } from '../executors/Executor.ts';
import { execute } from '../internal/execute.ts';

const pattern = /Removed sideloaded plugin id/;

/**
 * Remove a plugin from the account and device.
 */
export async function removePlugin(executor: Executor, id: number | 'dev'): Promise<void> {
  await execute(executor, 'remove_plugin', [`${id}`], [pattern]);
}
