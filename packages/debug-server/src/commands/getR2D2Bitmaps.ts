import type { Executor } from '../executors/Executor.ts';
import { execute } from '../internal/execute.js';
import type { R2D2Bitmap } from '../types/R2D2Bitmap.ts';

const pattern = /(?<address>0x\w+)\s+(?<width>\d+)\s+(?<height>\d+)\s+(?<bpp>\d+)\s+(?<size>\d+)\s+(?<bufSz>\d+)\s+(?<tex>\d+)\s+(?<fbo>\d+)\s+(?<name>.*)/g;

/**
 * Returns R2D2 bitmaps.
 */
export async function getR2D2Bitmaps(executor: Executor): Promise<R2D2Bitmap[]> {
  const [results] = await execute(executor, 'r2d2_bitmaps', [], [pattern]);
  return results.map((match) => {
    return {
      address: match.groups!.address,
      width: +match.groups!.width,
      height: +match.groups!.height,
      bpp: +match.groups!.bpp,
      size: +match.groups!.size,
      bufSz: +match.groups!.bufSz,
      tex: +match.groups!.tex,
      fbo: +match.groups!.fbo,
      name: match.groups!.name,
    };
  });
}
