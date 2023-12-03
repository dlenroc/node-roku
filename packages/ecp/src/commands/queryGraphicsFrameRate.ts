import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import parse from '../internal/xml.js';
import type { Failure } from '../types/Failure.ts';
import type { GraphicsFrameRate } from '../types/GraphicsFrameRate.ts';

export async function queryGraphicsFrameRate<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<Failure | GraphicsFrameRate> {
  const response = await execute(
    ctx,
    'query/graphics-frame-rate',
    undefined,
    config
  );
  return parse(await response.text());
}
