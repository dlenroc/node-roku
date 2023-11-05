import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';
import parse from '../internal/xml.js';
import type { SGRendezvous } from '../types/SGRendezvous.js';

export async function querySGRendezvous<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<SGRendezvous> {
  const response = await execute(ctx, 'query/sgrendezvous', undefined, config);
  return parse(await response.text());
}
