import type { Executor } from '../Executor.js';
import type { Config } from '../internal/Config.js';

export async function patchRegistry<Context extends Executor>(
  ctx: Context,
  params: Record<string, null | Record<string, any>>,
  config?: Config<Context>
): Promise<void> {
  await ctx.execute(
    {
      method: 'PATCH',
      path: 'registry',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(params),
    },
    config
  );
}
