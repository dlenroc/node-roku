import type { Executor } from '../executor/Executor.ts';

export function getPluginInspectCommand(
  command: string | Record<string, string | Blob>
): Parameters<Executor['execute']>[0] {
  return {
    method: 'POST',
    path: 'plugin_inspect',
    form:
      typeof command === 'string'
        ? { mysubmit: command, archive: '', passwd: '' }
        : command,
  };
}
