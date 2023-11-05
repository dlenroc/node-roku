import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';
import parse from '../internal/xml.js';
import type { AppId } from '../types/AppId.js';
import type { Failure } from '../types/Failure.js';
import type { Registry } from '../types/Registry.js';

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
