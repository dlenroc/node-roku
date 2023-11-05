import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';
import type { AppId } from '../types/AppId.js';

export async function queryIcon<Context extends Executor>(
  ctx: Context,
  params: { id: AppId },
  config?: Config<Context>
): Promise<ArrayBuffer> {
  const response = await execute(ctx, `query/icon/${params.id}`, undefined, config);
  return response.arrayBuffer();
}
