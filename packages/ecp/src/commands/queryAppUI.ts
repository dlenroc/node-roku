import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';

export async function queryAppUI<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<string> {
  const response = await execute(ctx, 'query/app-ui', undefined, config);
  return response.text();
}
