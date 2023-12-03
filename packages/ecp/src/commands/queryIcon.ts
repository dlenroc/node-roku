import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import type { AppId } from '../types/AppId.ts';

export async function queryIcon<Context extends Executor>(
  ctx: Context,
  params: { id: AppId },
  config?: Config<Context>
): Promise<ArrayBuffer> {
  const response = await execute(
    ctx,
    `query/icon/${params.id}`,
    undefined,
    config
  );
  return response.arrayBuffer();
}
