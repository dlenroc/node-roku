import type { Executor } from '../Executor.js';
import type { Nullable } from '../internal/Nullable.js';
import { execute, type Config } from '../internal/execute.js';
import parse from '../internal/xml.js';
import type { AppId } from '../types/AppId.js';
import type { FWBeaconsStatus } from '../types/FWBeaconsStatus.js';
import type { Failure } from '../types/Failure.js';

export async function trackFWBeacons<Context extends Executor>(
  ctx: Context,
  params?: Nullable<{ id?: Nullable<AppId> }>,
  config?: Config<Context>
): Promise<Failure | FWBeaconsStatus> {
  const response = await execute(
    ctx,
    `fwbeacons/track${params?.id ? `/${params.id}` : ''}`,
    undefined,
    config
  );
  return parse(await response.text());
}
