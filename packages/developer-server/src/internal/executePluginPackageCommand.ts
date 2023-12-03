import type { Executor } from '../Executor.ts';
import { execute } from './execute.js';
import { toFormData } from './toFormData.js';
import type { Config } from './types.d.ts';

export function executePluginPackageCommand<Context extends Executor>(
  ctx: Context,
  command?: string | Record<string, string | Blob>,
  config?: Config<Context>
): Promise<string> {
  return execute(ctx, 'plugin_package', {
    ...config!,
    method: 'POST',
    body: toFormData(
      typeof command === 'string'
        ? { mysubmit: command, pkg_time: '0', app_name: '', passwd: '' }
        : command
    ),
  });
}
