import type { Executor } from '../Executor.ts';
import { executePluginInstallCommand } from '../internal/executePluginInstallCommand.js';
import type { Config } from '../internal/types.d.ts';

/**
 * Sideload a channel from a zip file.
 */
export async function installChannel<Context extends Executor>(
  ctx: Context,
  payload: {
    /**
     * The content of the zip file to install.
     */
    content: Exclude<ConstructorParameters<typeof Blob>[0][0], string>;

    /**
     * Use squashfs instead of zip. Defaults to false.
     */
    useSquashfs?: Boolean;

    /**
     * Enable the socket based BrightScript {@link https://developer.roku.com/en-ca/docs/developer-program/debugging/socket-based-debugger.md | debug protocol}. Defaults to false.
     */
    remoteDebug?: boolean;

    /**
     * Enable the socket based BrightScript {@link https://developer.roku.com/en-ca/docs/developer-program/debugging/socket-based-debugger.md | debug protocol} early to catch compile errors. Defaults to false.
     */
    remoteDebugConnectEarly?: boolean;
  },
  config?: Config<Context>
): Promise<void> {
  await executePluginInstallCommand(
    ctx,
    {
      mysubmit: 'Install' + (payload.useSquashfs ? ' with squashfs' : ''),
      archive: new Blob([payload.content]),
      ...(payload.remoteDebug && { remotedebug: '1' }),
      ...(payload.remoteDebugConnectEarly && {
        remotedebug_connect_early: '1',
      }),
    },
    config
  );
}
