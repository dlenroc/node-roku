import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config, Nullable } from '../internal/types.d.ts';

export async function getAppUI<Context extends Executor>(
  ctx: Context,
  params?: Nullable<{ fields?: Nullable<Record<string, string[]>> }>,
  config?: Config<Context>
): Promise<string> {
  const response = await execute(
    ctx,
    { method: 'GET', path: 'app-ui', params },
    config
  );
  return response.text();
}
