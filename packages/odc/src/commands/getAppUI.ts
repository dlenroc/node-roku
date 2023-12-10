import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';

export async function getAppUI<Context extends Executor>(
  ctx: Context,
  payload?: { fields?: Record<string, string[]> },
  config?: Config<Context>
): Promise<string> {
  const response = await execute(
    ctx,
    { method: 'GET', path: 'app-ui', params: payload },
    config
  );
  return response.text();
}
