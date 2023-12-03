import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import parse from '../internal/xml.js';
import type { FWBeacons } from '../types/FWBeacons.ts';
import type { Failure } from '../types/Failure.ts';

export async function queryFWBeacons<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<Failure | FWBeacons> {
  const response = await execute(ctx, 'query/fwbeacons', undefined, config);
  return parse(await response.text(), {
    isArray: (tagName) => /-(initiate|complete)$/.test(tagName),
  });
}
