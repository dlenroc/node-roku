import type { Executor } from '../Executor.js';
import type { Config } from '../internal/Config.js';

export async function clearRegistry<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<void> {
  await ctx.execute({ method: 'DELETE', path: 'registry' }, config);
}
