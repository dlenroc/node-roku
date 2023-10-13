import type { Executor } from '../executor/Executor.ts';

export function getPluginPackageCommand(
  command: string | Record<string, string | Blob>
): Parameters<Executor['execute']>[0] {
  return {
    method: 'POST',
    path: 'plugin_package',
    form:
      typeof command === 'string'
        ? { mysubmit: command, pkg_time: '0', app_name: '', passwd: '' }
        : command,
  };
}
