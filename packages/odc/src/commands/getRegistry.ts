import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';

export async function getRegistry<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<Record<string, Record<string, string>>> {
  const response = await execute(
    ctx,
    { method: 'GET', path: 'registry' },
    config
  );
  return response.json() as any;
}
