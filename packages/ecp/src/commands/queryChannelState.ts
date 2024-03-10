import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import parse from '../internal/xml.js';
import type { AppId } from '../types/AppId.ts';
import type { ChannelState } from '../types/ChannelState.ts';

export async function queryChannelState<Context extends Executor>(
  ctx: Context,
  payload: { appId: AppId },
  config?: Config<Context>
): Promise<ChannelState> {
  const response = await execute(
    ctx,
    `query/channel-state/${payload.appId}`,
    undefined,
    config
  );
  return parse(await response.text());
}
