import type { Executor } from '../Executor.ts';
import { executePluginInspectCommand } from '../internal/executePluginInspectCommand.js';
import type { Config } from '../internal/types.d.ts';

/**
 * Rekey device from existing package signed with desired key.
 */
export async function rekey<Context extends Executor>(
  ctx: Context,
  payload: {
    /**
     * Package signed with desired key.
     */
    content: Exclude<ConstructorParameters<typeof Blob>[0][0], string>;

    /**
     * Password to decrypt the package.
     */
    password: string;
  },
  config?: Config<Context>
): Promise<void> {
  await executePluginInspectCommand(
    ctx,
    {
      mysubmit: 'Rekey',
      archive: new Blob([payload.content]),
      passwd: payload.password,
    },
    config
  );
}
