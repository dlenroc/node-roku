import type { Executor } from '../executors/Executor.ts';
import { execute } from '../internal/execute.js';

const pattern = /^\s*$/;

/**
 * Simulate a keypress.
 */
export async function press(executor: Executor, keys: string): Promise<void> {
  await execute(executor, 'press', [keys], [pattern]);
}
