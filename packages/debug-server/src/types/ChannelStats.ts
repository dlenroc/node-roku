export type ChannelStats = {
  /**
   * CPU utilization in percent.
   */
  cpu: {
    /**
     * Total CPU utilization in percent.
     */
    total: number;

    /**
     * User CPU utilization in percent.
     */
    user: number;

    /**
     * System CPU utilization in percent.
     */
    sys: number;
  };
  /**
   * Memory utilization in KibiBytes [KiB].
   */
  memory: {
    /**
     * Total memory utilization in KibiBytes [KiB].
     */
    total: number;

    /**
     * Anonymous memory utilization in KibiBytes [KiB].
     */
    anon: number;

    /**
     * Swap memory utilization in KibiBytes [KiB].
     */
    swap: number;

    /**
     * File memory utilization in KibiBytes [KiB].
     */
    file: number;

    /**
     * Shared memory utilization in KibiBytes [KiB].
     */
    shared: number;
  };
};
