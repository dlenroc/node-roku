import type { Executor } from '../Executor.ts';
import type { Nullable } from '../internal/Nullable.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import parse from '../internal/xml.js';
import type { AppId } from '../types/AppId.ts';
import type { ChannelPerformance } from '../types/ChannelPerformance.ts';
import type { Failure } from '../types/Failure.ts';
import type { Params } from '../types/Params.ts';

export async function queryChannelPerformance<Context extends Executor>(
  ctx: Context,
  params?: Nullable<{ id?: Nullable<AppId>; params?: Nullable<Params> }>,
  config?: Config<Context>
): Promise<Failure | ChannelPerformance> {
  const response = await execute(
    ctx,
    `query/chanperf${params?.id ? `/${params.id}` : ''}`,
    params,
    config
  );
  return parse(await response.text());
}
