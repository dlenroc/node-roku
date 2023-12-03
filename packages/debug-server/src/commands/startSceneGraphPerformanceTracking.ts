import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';

const pattern = /^\s*$/;

/**
 * Start SceneGraph performance tracking.
 */
export async function startSceneGraphPerformanceTracking<
  Context extends Executor
>(ctx: Context, config?: Config<Context>): Promise<void> {
  await execute(ctx, 'sgperf start', [pattern], config);
}
