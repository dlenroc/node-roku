import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';

const pattern = /^\s*$/;

/**
 * Clear SceneGraph node operation performance metrics.
 */
export async function clearSceneGraphPerformanceMetrics<
  Context extends Executor<{}>
>(ctx: Context, config?: Config<Context>): Promise<void> {
  await execute(ctx, 'sgperf', ['clear'], [pattern], config);
}
