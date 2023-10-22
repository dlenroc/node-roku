import type { Executor } from '../executors/Executor.ts';
import { execute } from '../internal/execute.js';
import type { LoadedTextures } from '../types/LoadedTextures.ts';

const pattern = /\* .+ Textures +\*/;

/**
 * Returns loaded textures.
 */
export async function getLoadedTextures(executor: Executor, overlay?: string): Promise<LoadedTextures> {
  const args = overlay ? [overlay] : [];
  const [[match]] = await execute(executor, 'loaded_textures', args, [pattern]);
  const result = match.input + '\n';

  const textureMemoryMatches = result.match(/Texture Memory: (\d+)KB of (\d+)KB used/) || [0, 0, 0];
  const used = +textureMemoryMatches[1];
  const total = +textureMemoryMatches[2];

  const systemTextures = [];
  const systemTexturesMatches = result
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
  const downloadedTexturesMatches = result
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
  const channelTexturesMatches = result
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
