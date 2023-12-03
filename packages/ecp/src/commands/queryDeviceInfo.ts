import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import parse from '../internal/xml.js';
import type { DeviceInfo } from '../types/DeviceInfo.ts';

export async function queryDeviceInfo<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<DeviceInfo> {
  const response = await execute(ctx, 'query/device-info', undefined, config);
  return parse(await response.text());
}
