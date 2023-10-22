import type { Executor } from '../executors/Executor.ts';
import { execute } from '../internal/execute.js';

const pattern = /^\s*$/;

/**
 * Clear SceneGraph node operation performance metrics.
 */
export async function clearSceneGraphPerformanceData(executor: Executor): Promise<void> {
  await execute(executor, 'sgperf', ['clear'], [pattern]);
}
