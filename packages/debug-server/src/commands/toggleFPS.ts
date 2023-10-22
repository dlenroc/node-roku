import type { Executor } from '../executors/Executor.ts';
import { execute } from '../internal/execute.js';

const pattern = /^\s*$/;

/**
 * Toggle onscreen graphics statistics.
 */
export async function toggleFPS(executor: Executor): Promise<void> {
  await execute(executor, 'fps_display', [], [pattern]);
}
