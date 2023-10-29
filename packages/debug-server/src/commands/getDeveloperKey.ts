import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';

const pattern = /Dev ID: (.+)/;

/**
 * Returns current developer key.
 */
export async function getDeveloperKey<Context extends Executor<{}>>(
  ctx: Context,
  config?: Config<Context>
): Promise<string> {
  const [[result]] = await execute(ctx, 'showkey', [], [pattern], config);
  return result[1];
}
