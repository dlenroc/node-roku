import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';

const pattern = /^\s*$/;

/**
 * Stop SceneGraph performance tracking.
 */
export async function stopSceneGraphPerformanceTracking<
  Context extends Executor<{}>
>(ctx: Context, config?: Config<Context>): Promise<void> {
  await execute(ctx, 'sgperf', ['stop'], [pattern], config);
}
