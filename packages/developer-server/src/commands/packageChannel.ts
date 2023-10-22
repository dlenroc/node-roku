import type { Executor } from '../executor/Executor.ts';
import { execute } from '../internal/execute.js';
import { getPluginPackageCommand } from '../internal/getPluginPackageCommand.js';

/**
 * Package sideloaded channel.
 */
export async function packageChannel(
  ctx: Executor,
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
  }
): Promise<void> {
  await execute(
    ctx,
    getPluginPackageCommand({
      mysubmit: 'Package',
      pkg_time: String(option.timestamp ?? new Date().getTime()),
      app_name: option.name,
      passwd: option.password,
    })
  );
}
