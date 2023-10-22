import type { Executor } from '../executors/Executor.ts';
import { execute } from '../internal/execute.js';

const pattern = /^\s*$/;

/**
 * Send a literal text sequence.
 */
export async function type(executor: Executor, text: string): Promise<void> {
  await execute(executor, 'type', [text], [pattern]);
}
