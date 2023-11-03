import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';
import { getPluginPackageCommand } from '../internal/getPluginPackageCommand.js';

/**
 * Package sideloaded channel.
 */
export async function packageChannel<Context extends Executor<{}>>(
  ctx: Context,
  option: {
    /**
     * Channel Name/Version
     */
    name: string;

    /**
     * Developer Password
     */
    password: string;

    /**
     * Timestamp in milliseconds (default: current time)
     */
    timestamp?: number;
  },
  config?: Config<Context>
): Promise<void> {
  await execute(
    ctx,
    getPluginPackageCommand({
      mysubmit: 'Package',
      pkg_time: String(option.timestamp ?? new Date().getTime()),
      app_name: option.name,
      passwd: option.password,
    }),
    config
  );
}
