import type { Executor } from '../Executor.ts';
import type { Nullable } from '../internal/Nullable.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import parse from '../internal/xml.js';
import type { AppId } from '../types/AppId.ts';
import type { Failure } from '../types/Failure.ts';
import type { R2D2Bitmaps } from '../types/R2D2Bitmaps.ts';

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
