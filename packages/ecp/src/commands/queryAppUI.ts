import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';

export async function queryAppUI<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<string> {
  const response = await execute(ctx, 'query/app-ui', undefined, config);
  return response.text();
}
