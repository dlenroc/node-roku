import type { Executor } from '../Executor.js';
import type { Nullable } from '../internal/Nullable.js';
import { execute, type Config } from '../internal/execute.js';
import type { AppId } from '../types/AppId.js';

export async function querySGNodesRoots<Context extends Executor>(
  ctx: Context,
  params?: Nullable<{ id?: Nullable<AppId> }>,
  config?: Config<Context>
): Promise<string> {
  const response = await execute(
    ctx,
    `query/sgnodes/roots${params?.id ? `/${params.id}` : ''}`,
    undefined,
    config
  );
  return response.text();
}
