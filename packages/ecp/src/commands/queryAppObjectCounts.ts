import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import parse from '../internal/xml.js';
import type { AppObjectCounts } from '../types/AppObjectCounts.ts';

export async function queryAppObjectCounts<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<AppObjectCounts> {
  const response = await execute(
    ctx,
    `query/app-object-counts`,
    undefined,
    config
  );
  return parse(await response.text());
}
