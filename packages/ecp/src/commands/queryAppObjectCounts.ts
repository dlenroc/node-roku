import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import parse from '../internal/xml.js';
import type { AppId } from '../types/AppId.ts';
import type { AppObjectCounts } from '../types/AppObjectCounts.ts';
import type { Failure } from '../types/Failure.ts';

export async function queryAppObjectCounts<Context extends Executor>(
  ctx: Context,
  payload: { appId: AppId },
  config?: Config<Context>
): Promise<Failure | AppObjectCounts> {
  const response = await execute(
    ctx,
    `query/app-object-counts/${payload.appId}`,
    undefined,
    config
  );
  return parse(await response.text(), {
    isArray: (tagName) => tagName === 'object',
  });
}
