import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';
import parse from '../internal/xml.js';
import type { Failure } from '../types/Failure.js';
import type { GraphicsFrameRate } from '../types/GraphicsFrameRate.js';

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
