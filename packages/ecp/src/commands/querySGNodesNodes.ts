import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import type { AppId } from '../types/AppId.ts';

export async function querySGNodesNodes<Context extends Executor>(
  ctx: Context,
  payload: { appId?: AppId; nodeId: string },
  config?: Config<Context>
): Promise<string> {
  const response = await execute(
    ctx,
    `query/sgnodes/nodes${payload?.appId ? `/${payload.appId}` : ''}?node-id=${
      payload.nodeId
    }`,
    undefined,
    config
  );
  return response.text();
}
