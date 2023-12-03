import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import parse from '../internal/xml.js';
import type { AppId } from '../types/AppId.ts';
import type { Failure } from '../types/Failure.ts';
import type { Registry } from '../types/Registry.ts';

export async function queryRegistry<Context extends Executor>(
  ctx: Context,
  params: { id: AppId },
  config?: Config<Context>
): Promise<Failure | Registry> {
  const response = await execute(
    ctx,
    `query/registry/${params.id}`,
    undefined,
    config
  );
  return parse(await response.text());
}
