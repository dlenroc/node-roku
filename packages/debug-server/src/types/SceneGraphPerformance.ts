export type SceneGraphPerformance = {
  /**
   * Number of node create calls.
   */
  create: number;

  /**
   * Number of node operation calls.
   */
  operation: number;

  /**
   * Percentage of node operation calls that required a rendezvous.
   */
  rendezvous: number;
};
