import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';
import type { LoadedTextures } from '../types/LoadedTextures.ts';

const pattern = /\* .+ Textures +\*/;

/**
 * Returns loaded textures.
 */
export async function getLoadedTextures<Context extends Executor<{}>>(
  ctx: Context,
  payload?: {
    /**
     * Overlay name, defaults to main RenderContext
     */
    overlay?: string;
  },
  config?: Config<Context>
): Promise<LoadedTextures> {
  const args = payload?.overlay ? [payload.overlay] : [];
  const [[match]] = await execute(
    ctx,
    'loaded_textures',
    args,
    [pattern],
    config
  );
  const result = match.input + '\n';

  const textureMemoryMatches = result.match(
    /Texture Memory: (\d+)KB of (\d+)KB used/
  ) || [0, 0, 0];
  const used = +textureMemoryMatches[1];
  const total = +textureMemoryMatches[2];

  const systemTextures = [];
  const systemTexturesMatches: any = result
    .match(/\*\s+System textures\s+\*\s*\n[\s\S]+?\n\n/)?.[0]
    ?.matchAll(/(\d+)\s+x\s+(\d+)\s+(\d+)\s+(.+)/g);

  if (systemTexturesMatches) {
    for (const groups of systemTexturesMatches) {
      systemTextures.push({
        width: +groups[1],
        height: +groups[2],
        size: +groups[3],
        url: groups[4],
      });
    }
  }

  const downloadTextures = [];
  const downloadedTexturesMatches: any = result
    .match(/\*\s+Downloaded textures\s+\*\s*\n[\s\S]+?\n\n/)?.[0]
    ?.matchAll(/(\d+)\s+x\s+(\d+)\s+(\d+)\s+(.+)/g);

  if (downloadedTexturesMatches) {
    for (const groups of downloadedTexturesMatches) {
      downloadTextures.push({
        width: +groups[1],
        height: +groups[2],
        size: +groups[3],
        url: groups[4],
      });
    }
  }

  const channelTextures = [];
  const channelTexturesMatches: any = result
    .match(/\*\s+Channel textures\s+\*\s*\n[\s\S]+?\n\n/)?.[0]
    ?.matchAll(/(\d+)\s+x\s+(\d+)\s+(\d+)\s+(.+)/g);

  if (channelTexturesMatches) {
    for (const groups of channelTexturesMatches) {
      channelTextures.push({
        width: +groups[1],
        height: +groups[2],
        size: +groups[3],
        url: groups[4],
      });
    }
  }

  return {
    used,
    total,
    system: systemTextures,
    downloaded: downloadTextures,
    channel: channelTextures,
  };
}
