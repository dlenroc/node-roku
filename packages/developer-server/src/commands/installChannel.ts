import type { Executor } from '../executor/Executor.ts';
import { execute } from '../internal/execute.ts';
import { getPluginInstallCommand } from '../internal/getPluginInstallCommand.ts';

/**
 * Sideload a channel from a zip file.
 */
export async function installChannel(
  ctx: Executor,
  option: {
    /**
     * The content of the zip file to install.
     */
    content: Blob | NodeJS.ArrayBufferView;

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
  }
): Promise<void> {
  await execute(
    ctx,
    getPluginInstallCommand({
      mysubmit: 'Install' + (option.useSquashfs ? ' with squashfs' : ''),
      archive: new Blob([option.content]),
      ...(option.remoteDebug && { remotedebug: '1' }),
      ...(option.remoteDebugConnectEarly && { remotedebug_connect_early: '1' }),
    })
  );
}
