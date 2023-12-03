import type { Executor } from '../Executor.ts';
import type { Nullable } from '../internal/Nullable.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import type { AppId } from '../types/AppId.ts';

export async function querySGNodesNodes<Context extends Executor>(
  ctx: Context,
  params: { id?: Nullable<AppId>; nodeId: string },
  config?: Config<Context>
): Promise<string> {
  const response = await execute(
    ctx,
    `query/sgnodes/nodes${params?.id ? `/${params.id}` : ''}?node-id=${
      params.nodeId
    }`,
    undefined,
    config
  );
  return response.text();
}
