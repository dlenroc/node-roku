import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';
import parse from '../internal/xml.js';
import type { App } from '../types/App.js';

export async function queryApps<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<App[]> {
  const response = await execute(ctx, 'query/apps', undefined, config);
  return parse(await response.text(), { array: true, textNodeName: 'name' });
}
