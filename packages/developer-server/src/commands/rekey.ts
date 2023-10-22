import type { Executor } from '../executor/Executor.ts';
import { execute } from '../internal/execute.js';
import { getPluginInspectCommand } from '../internal/getPluginInspectCommand.js';

/**
 * Rekey device from existing package signed with desired key.
 */
export async function rekey(
  ctx: Executor,
  option: {
    /**
     * Package signed with desired key.
     */
    content: Blob | NodeJS.ArrayBufferView;

    /**
     * Password to decrypt the package.
     */
    password: string;
  }
): Promise<void> {
  await execute(
    ctx,
    getPluginInspectCommand({
      mysubmit: 'Rekey',
      archive: new Blob([option.content]),
      passwd: option.password,
    })
  );
}
