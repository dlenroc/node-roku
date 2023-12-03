import type { Executor } from '../Executor.ts';
import { execute } from './execute.js';
import { toFormData } from './toFormData.js';
import type { Config } from './types.d.ts';

export function executePluginInstallCommand<Context extends Executor>(
  ctx: Context,
  command?: string | Record<string, string | Blob>,
  config?: Config<Context>
): Promise<string> {
  return execute(ctx, 'plugin_install', {
    ...config!,
    method: 'POST',
    body: toFormData(
      typeof command === 'string' ? { mysubmit: command, archive: '' } : command
    ),
  });
}
