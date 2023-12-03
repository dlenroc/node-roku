import type { Executor } from '../Executor.ts';
import type { Nullable } from '../internal/Nullable.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import type { AppId } from '../types/AppId.ts';

export async function querySGNodesAll<Context extends Executor>(
  ctx: Context,
  params?: Nullable<{ id?: Nullable<AppId> }>,
  config?: Config<Context>
): Promise<string> {
  const response = await execute(
    ctx,
    `query/sgnodes/all${params?.id ? `/${params.id}` : ''}`,
    undefined,
    config
  );
  return response.text();
}
