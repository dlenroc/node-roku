import type { Executor } from '../Executor.js';
import type { Config } from '../internal/Config.js';
import type { Directory } from '../types/Directory.js';
import type { File } from '../types/File.js';

export async function getFiles<Context extends Executor>(
  ctx: Context,
  params: { path: string },
  config?: Config<Context>
): Promise<(File | Directory)[]> {
  const response = await ctx.execute(
    { method: 'GET', path: 'files', params },
    config
  );
  return response.json() as any;
}
