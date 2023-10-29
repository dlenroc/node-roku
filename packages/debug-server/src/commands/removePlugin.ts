import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';

const pattern = /Removed sideloaded plugin id/;

/**
 * Remove a plugin from the account and device.
 */
export async function removePlugin<Context extends Executor<{}>>(
  ctx: Context,
  payload: {
    /**
     * Plugin id to remove.
     */
    id: 'dev' | number;
  },
  config?: Config<Context>
): Promise<void> {
  await execute(ctx, 'remove_plugin', [`${payload.id}`], [pattern], config);
}
