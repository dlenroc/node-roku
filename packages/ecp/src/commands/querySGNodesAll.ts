import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import type { AppId } from '../types/AppId.ts';

export async function querySGNodesAll<Context extends Executor>(
  ctx: Context,
  payload?: { appId?: AppId },
  config?: Config<Context>
): Promise<string> {
  const response = await execute(
    ctx,
    `query/sgnodes/all${payload?.appId ? `/${payload.appId}` : ''}`,
    undefined,
    config
  );
  return response.text();
}
