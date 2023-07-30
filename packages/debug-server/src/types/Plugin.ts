export type Plugin = {
  /**
   * The plugin ID.
   */
  id: number | string;

  /**
   * Whether the plugin is running.
   */
  is_running: boolean;

  /**
   * The plugin name.
   */
  name: string;

  /**
   * The plugin version.
   */
  version: string;
};
