export type ProfilingStatus = {
  /**
   * `true` if profiling is resumed, `false` if paused.
   */
  resumed: boolean;

  /**
   * The destination of the profiling data.
   *
   * @example
   * "local" - when `bsprof_data_dest=local` is set in channel manifest.
   * "network" - when `bsprof_data_dest=network` is set in channel manifest.
   */
  destination: string;

  /**
   * The metrics that are being collected.
   *
   * @example
   * "cpu" - when `bsprof_enable=1` is set in channel manifest.
   * "mem" - when `bsprof_enable_mem=1` is set in channel manifest.
   * "lines" - when `bsprof_enable_lines=1` is set in channel manifest.
   */
  metrics: string[];
};
