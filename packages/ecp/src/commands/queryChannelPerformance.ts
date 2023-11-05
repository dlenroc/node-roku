import type { Executor } from '../Executor.js';
import type { Nullable } from '../internal/Nullable.js';
import { execute, type Config } from '../internal/execute.js';
import parse from '../internal/xml.js';
import type { AppId } from '../types/AppId.js';
import type { ChannelPerformance } from '../types/ChannelPerformance.js';
import type { Failure } from '../types/Failure.js';
import type { Params } from '../types/Params.js';

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
