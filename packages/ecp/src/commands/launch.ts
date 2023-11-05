import type { Executor } from '../Executor.js';
import type { Nullable } from '../internal/Nullable.js';
import { execute, type Config } from '../internal/execute.js';
import type { AppId } from '../types/AppId.js';
import type { Params } from '../types/Params.js';

export async function launch<Context extends Executor>(
  ctx: Context,
  params: { id: AppId; params?: Nullable<Params> },
  config?: Config<Context>
): Promise<void> {
  await execute(ctx, `launch/${params.id}`, params.params, config);
}
