import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';

const pattern = /Dev ID: (.+)/;

/**
 * Returns current developer key.
 */
export async function getDeveloperKey<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<string> {
  const [[result]] = await execute(ctx, 'showkey', [pattern], config);
  return result[1];
}
