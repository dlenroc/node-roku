import type { Executor } from '../Executor.js';
import type { Config } from '../internal/Config.js';
import type { Nullable } from '../internal/Nullable.js';

export async function getAppUI<Context extends Executor>(
  ctx: Context,
  params?: Nullable<{ fields?: Nullable<Record<string, string[]>> }>,
  config?: Config<Context>
): Promise<string> {
  const response = await ctx.execute(
    { method: 'GET', path: 'app-ui', params },
    config
  );
  return response.text();
}
