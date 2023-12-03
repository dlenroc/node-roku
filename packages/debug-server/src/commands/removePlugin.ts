import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';

const pattern = /Removed sideloaded plugin id/;

/**
 * Remove a plugin from the account and device.
 */
export async function removePlugin<Context extends Executor>(
  ctx: Context,
  payload: {
    /**
     * Plugin id to remove.
     */
    id: 'dev' | number;
  },
  config?: Config<Context>
): Promise<void> {
  await execute(ctx, `remove_plugin ${payload.id}`, [pattern], config);
}
