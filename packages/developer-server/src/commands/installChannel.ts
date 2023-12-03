import type { Executor } from '../Executor.ts';
import { executePluginInstallCommand } from '../internal/executePluginInstallCommand.js';
import type { Config } from '../internal/types.d.ts';

/**
 * Sideload a channel from a zip file.
 */
export async function installChannel<Context extends Executor>(
  ctx: Context,
  option: {
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
      mysubmit: 'Install' + (option.useSquashfs ? ' with squashfs' : ''),
      archive: new Blob([option.content]),
      ...(option.remoteDebug && { remotedebug: '1' }),
      ...(option.remoteDebugConnectEarly && { remotedebug_connect_early: '1' }),
    },
    config
  );
}
