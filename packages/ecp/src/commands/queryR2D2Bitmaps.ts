import type { Executor } from '../Executor.js';
import type { Nullable } from '../internal/Nullable.js';
import { execute, type Config } from '../internal/execute.js';
import parse from '../internal/xml.js';
import type { AppId } from '../types/AppId.js';
import type { Failure } from '../types/Failure.js';
import type { R2D2Bitmaps } from '../types/R2D2Bitmaps.js';

export async function queryR2D2Bitmaps<Context extends Executor>(
  ctx: Context,
  params?: Nullable<{ id?: Nullable<AppId> }>,
  config?: Config<Context>
): Promise<Failure | R2D2Bitmaps> {
  const response = await execute(
    ctx,
    `query/r2d2-bitmaps${params?.id ? `/${params.id}` : ''}`,
    undefined,
    config
  );
  return parse(await response.text());
}
