import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import type { AppId } from '../types/AppId.ts';

export async function launch<Context extends Executor>(
  ctx: Context,
  payload: { appId: AppId; params?: Record<string, unknown> },
  config?: Config<Context>
): Promise<void> {
  await execute(ctx, `launch/${payload.appId}`, payload.params, config);
}
