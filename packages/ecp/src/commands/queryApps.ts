import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import parse from '../internal/xml.js';
import type { App } from '../types/App.ts';

export async function queryApps<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<App[]> {
  const response = await execute(ctx, 'query/apps', undefined, config);
  return parse(await response.text(), { array: true, textNodeName: 'name' });
}
