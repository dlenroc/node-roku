import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import type { DeveloperKey } from '../types/DeveloperKey.ts';

const idPattern = /DevID: (.*)/;
const passwordPattern = /Password: (.*)/;

/**
 * Generate a new developer key.
 */
export async function createDeveloperKey<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<DeveloperKey> {
  const result = await execute(
    ctx,
    'genkey',
    [idPattern, passwordPattern],
    config
  );

  return { id: result[0][0][1], password: result[1][0][1] };
}
