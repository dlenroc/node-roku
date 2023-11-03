export function getPluginPackageCommand(
  command?: string | Record<string, string | Blob>
): { path: string; body: Record<string, string | Blob> | undefined } {
  return {
    path: 'plugin_package',
    body:
      typeof command === 'string'
        ? { mysubmit: command, pkg_time: '0', app_name: '', passwd: '' }
        : command,
  };
}
