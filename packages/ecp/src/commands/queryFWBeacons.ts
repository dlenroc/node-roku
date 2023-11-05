import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';
import parse from '../internal/xml.js';
import type { FWBeacons } from '../types/FWBeacons.js';
import type { Failure } from '../types/Failure.js';

export async function queryFWBeacons<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<Failure | FWBeacons> {
  const response = await execute(ctx, 'query/fwbeacons', undefined, config);
  return parse(await response.text(), {
    isArray: (tagName) => /-(initiate|complete)$/.test(tagName),
  });
}
