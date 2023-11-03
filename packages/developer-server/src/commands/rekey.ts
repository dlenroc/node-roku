import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';
import { getPluginInspectCommand } from '../internal/getPluginInspectCommand.js';

/**
 * Rekey device from existing package signed with desired key.
 */
export async function rekey<Context extends Executor<{}>>(
  ctx: Context,
  option: {
    /**
     * Package signed with desired key.
     */
    content: Blob | NodeJS.ArrayBufferView;

    /**
     * Password to decrypt the package.
     */
    password: string;
  },
  config?: Config<Context>
): Promise<void> {
  await execute(
    ctx,
    getPluginInspectCommand({
      mysubmit: 'Rekey',
      archive: new Blob([option.content]),
      passwd: option.password,
    }),
    config
  );
}
