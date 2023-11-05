import type { Executor } from '../Executor.js';
import type { Nullable } from '../internal/Nullable.js';
import { execute, type Config } from '../internal/execute.js';
import type { AppId } from '../types/AppId.js';

export async function querySGNodesNodes<Context extends Executor>(
  ctx: Context,
  params: { id?: Nullable<AppId>, nodeId: string },
  config?: Config<Context>
): Promise<string> {
  const response = await execute(
    ctx,
    `query/sgnodes/nodes${params?.id ? `/${params.id}` : ''}?node-id=${params.nodeId}`,
    undefined,
    config
  );
  return response.text();
}
