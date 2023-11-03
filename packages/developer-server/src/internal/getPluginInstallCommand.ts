export function getPluginInstallCommand(
  command?: string | Record<string, string | Blob>
): { path: string; body: Record<string, string | Blob> | undefined } {
  return {
    path: 'plugin_install',
    body:
      typeof command === 'string'
        ? { mysubmit: command, archive: '' }
        : command,
  };
}
