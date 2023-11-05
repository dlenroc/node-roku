import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';
import parse from '../internal/xml.js';
import type { MediaInfo } from '../types/MediaInfo.js';

export async function queryMediaPlayer<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<MediaInfo> {
  const response = await execute(ctx, 'query/media-player', undefined, config);
  return parse(await response.text());
}
