import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import type { AppId } from '../types/AppId.ts';

export async function queryIcon<Context extends Executor>(
  ctx: Context,
  payload: { appId: AppId },
  config?: Config<Context>
): Promise<ArrayBuffer> {
  const response = await execute(
    ctx,
    `query/icon/${payload.appId}`,
    undefined,
    config
  );
  return response.arrayBuffer();
}
