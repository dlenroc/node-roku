import type { Executor } from '../executors/Executor.ts';
import { execute } from '../internal/execute.js';

const pattern = /^\s*$/;

/**
 * Stop SceneGraph performance tracking.
 */
export async function stopSceneGraphPerformanceTracking(executor: Executor): Promise<void> {
  await execute(executor, 'sgperf', ['stop'], [pattern]);
}
