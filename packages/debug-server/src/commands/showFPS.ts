import { Executor } from '../executors/Executor.ts';
import { execute } from '../internal/execute.ts';

const pattern = /^\s*$/;

/**
 * Show onscreen graphics statistics.
 */
export async function showFPS(executor: Executor): Promise<void> {
  await execute(executor, 'fps_display', ['1'], [pattern]);
}
