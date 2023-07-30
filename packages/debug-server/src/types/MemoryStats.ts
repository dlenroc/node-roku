export type MemoryStats = {
  /**
   * Memory in KibiBytes [KiB].
   */
  mem: {
    /**
     * Total memory in KibiBytes [KiB].
     */
    total: number;

    /**
     * Used memory in KibiBytes [KiB].
     */
    used: number;

    /**
     * Free memory in KibiBytes [KiB].
     */
    free: number;

    /**
     * Shared memory in KibiBytes [KiB].
     */
    shared: number;

    /**
     * Cache memory in KibiBytes [KiB].
     */
    cache: number;

    /**
     * Available memory in KibiBytes [KiB].
     */
    available: number;
  };

  /**
   * Swap in KibiBytes [KiB].
   */
  swap: {
    /**
     * Total swap in KibiBytes [KiB].
     */
    total: number;

    /**
     * Used swap in KibiBytes [KiB].
     */
    used: number;

    /**
     * Free swap in KibiBytes [KiB].
     */
    free: number;
  };
};
