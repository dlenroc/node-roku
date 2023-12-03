import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import parse from '../internal/xml.js';
import type { MediaInfo } from '../types/MediaInfo.ts';

export async function queryMediaPlayer<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<MediaInfo> {
  const response = await execute(ctx, 'query/media-player', undefined, config);
  return parse(await response.text());
}
