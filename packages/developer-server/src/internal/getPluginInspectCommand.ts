export function getPluginInspectCommand(
  command?: string | Record<string, string | Blob>
): { path: string; body: Record<string, string | Blob> | undefined } {
  return {
    path: 'plugin_inspect',
    body:
      typeof command === 'string'
        ? { mysubmit: command, archive: '', passwd: '' }
        : command,
  };
}
