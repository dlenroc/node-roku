import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';

const pattern = /^\s*$/;

/**
 * Start SceneGraph performance tracking.
 */
export async function startSceneGraphPerformanceTracking<
  Context extends Executor<{}>
>(ctx: Context, config?: Config<Context>): Promise<void> {
  await execute(ctx, 'sgperf', ['start'], [pattern], config);
}
