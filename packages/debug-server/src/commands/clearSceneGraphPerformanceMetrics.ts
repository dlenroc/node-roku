import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';

const pattern = /^\s*$/;

/**
 * Clear SceneGraph node operation performance metrics.
 */
export async function clearSceneGraphPerformanceMetrics<
  Context extends Executor
>(ctx: Context, config?: Config<Context>): Promise<void> {
  await execute(ctx, 'sgperf clear', [pattern], config);
}
