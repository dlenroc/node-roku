import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import parse from '../internal/xml.js';
import type { AppId } from '../types/AppId.ts';
import type { Failure } from '../types/Failure.ts';
import type { SGRendezvousStatus } from '../types/SGRendezvousStatus.ts';

export async function untrackSGRendezvous<Context extends Executor>(
  ctx: Context,
  payload?: { appId?: AppId },
  config?: Config<Context>
): Promise<Failure | SGRendezvousStatus> {
  const response = await execute(
    ctx,
    `sgrendezvous/untrack${payload?.appId ? `/${payload.appId}` : ''}`,
    undefined,
    config
  );
  return parse(await response.text());
}
