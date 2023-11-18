import type { Executor } from '../Executor.js';
import type { Config } from '../internal/Config.js';

export async function getRegistry<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<Record<string, Record<string, string>>> {
  const response = await ctx.execute(
    { method: 'GET', path: 'registry' },
    config
  );
  return response.json() as any;
}
