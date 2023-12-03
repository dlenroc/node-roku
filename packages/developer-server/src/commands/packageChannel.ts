import type { Executor } from '../Executor.ts';
import { executePluginPackageCommand } from '../internal/executePluginPackageCommand.js';
import type { Config } from '../internal/types.d.ts';

/**
 * Package sideloaded channel and return path to it
 */
export async function packageChannel<Context extends Executor>(
  ctx: Context,
  payload: {
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
): Promise<string | null> {
  const body = await executePluginPackageCommand(
    ctx,
    {
      mysubmit: 'Package',
      pkg_time: String(payload.timestamp ?? new Date().getTime()),
      app_name: payload.name,
      passwd: payload.password,
    },
    config
  );

  return body.match(/pkgs\/.+?.pkg/)?.[0] ?? null;
}
