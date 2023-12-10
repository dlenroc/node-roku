import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import parse from '../internal/xml.js';
import type { AppId } from '../types/AppId.ts';
import type { ChannelPerformance } from '../types/ChannelPerformance.ts';
import type { Failure } from '../types/Failure.ts';

export async function queryChannelPerformance<Context extends Executor>(
  ctx: Context,
  payload?: { appId?: AppId; params?: Record<string, unknown> },
  config?: Config<Context>
): Promise<Failure | ChannelPerformance> {
  const response = await execute(
    ctx,
    `query/chanperf${payload?.appId ? `/${payload.appId}` : ''}`,
    payload?.params,
    config
  );
  return parse(await response.text());
}
