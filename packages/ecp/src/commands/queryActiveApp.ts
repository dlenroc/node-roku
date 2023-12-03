import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import parse from '../internal/xml.js';
import type { ActiveApp } from '../types/ActiveApp.ts';

export async function queryActiveApp<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<ActiveApp> {
  const response = await execute(ctx, 'query/active-app', undefined, config);
  return parse(await response.text(), {
    alwaysCreateTextNode: true,
    textNodeName: 'name',
  });
}
