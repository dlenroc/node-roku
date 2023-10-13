import type { Executor } from '../executor/Executor.ts';

export function getPluginInstallCommand(
  command: string | Record<string, string | Blob>
): Parameters<Executor['execute']>[0] {
  return {
    method: 'POST',
    path: 'plugin_install',
    form:
      typeof command === 'string'
        ? { mysubmit: command, archive: '' }
        : command,
  };
}
