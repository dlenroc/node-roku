import type { Executor } from '../executors/Executor.ts';
import { execute } from '../internal/execute.js';

const pattern = /^\s*$/;

/**
 * Start SceneGraph performance tracking.
 */
export async function startSceneGraphPerformanceTracking(executor: Executor): Promise<void> {
  await execute(executor, 'sgperf', ['start'], [pattern]);
}
