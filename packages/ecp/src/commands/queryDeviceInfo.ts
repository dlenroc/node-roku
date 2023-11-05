import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';
import parse from '../internal/xml.js';
import type { DeviceInfo } from '../types/DeviceInfo.js';

export async function queryDeviceInfo<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<DeviceInfo> {
  const response = await execute(ctx, 'query/device-info', undefined, config);
  return parse(await response.text());
}
