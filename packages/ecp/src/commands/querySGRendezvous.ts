import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import parse from '../internal/xml.js';
import type { SGRendezvous } from '../types/SGRendezvous.ts';

export async function querySGRendezvous<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<SGRendezvous> {
  const response = await execute(ctx, 'query/sgrendezvous', undefined, config);
  return parse(await response.text());
}
