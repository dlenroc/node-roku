import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import parse from '../internal/xml.js';
import type { AppId } from '../types/AppId.ts';
import type { FWBeaconsStatus } from '../types/FWBeaconsStatus.ts';
import type { Failure } from '../types/Failure.ts';

export async function trackFWBeacons<Context extends Executor>(
  ctx: Context,
  payload?: { appId?: AppId },
  config?: Config<Context>
): Promise<Failure | FWBeaconsStatus> {
  const response = await execute(
    ctx,
    `fwbeacons/track${payload?.appId ? `/${payload.appId}` : ''}`,
    undefined,
    config
  );
  return parse(await response.text());
}
