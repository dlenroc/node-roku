import { Executor } from '../executors/Executor.ts';
import { execute } from '../internal/execute.ts';

const pattern = /^\s*$/;

/**
 * Hide onscreen graphics statistics.
 */
export async function hideFPS(executor: Executor): Promise<void> {
  await execute(executor, 'fps_display', ['0'], [pattern]);
}
