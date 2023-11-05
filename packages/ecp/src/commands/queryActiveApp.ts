import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';
import parse from '../internal/xml.js';
import type { ActiveApp } from '../types/ActiveApp.js';

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
