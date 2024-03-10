import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.ts';
import type { AppId } from '../types/AppId.ts';

export async function exitApp<Context extends Executor>(
  ctx: Context,
  payload: { appId: AppId },
  config?: Config<Context>
): Promise<boolean> {
  const response = await execute(
    ctx,
    `exit-app/${payload.appId}`,
    undefined,
    config
  );
  await response.body?.cancel();
  return response.status === 200;
}
