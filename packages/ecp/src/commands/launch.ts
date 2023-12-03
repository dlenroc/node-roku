import type { Executor } from '../Executor.ts';
import type { Nullable } from '../internal/Nullable.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import type { AppId } from '../types/AppId.ts';
import type { Params } from '../types/Params.ts';

export async function launch<Context extends Executor>(
  ctx: Context,
  params: { id: AppId; params?: Nullable<Params> },
  config?: Config<Context>
): Promise<void> {
  await execute(ctx, `launch/${params.id}`, params.params, config);
}
