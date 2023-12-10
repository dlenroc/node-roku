import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import type { Directory } from '../types/Directory.ts';
import type { File } from '../types/File.ts';

export async function getFiles<Context extends Executor>(
  ctx: Context,
  payload: { path: string },
  config?: Config<Context>
): Promise<(File | Directory)[]> {
  const response = await execute(
    ctx,
    { method: 'GET', path: 'files', params: payload },
    config
  );
  return response.json() as any;
}
