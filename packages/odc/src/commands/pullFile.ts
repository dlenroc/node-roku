import type { Executor } from '../Executor.js';
import type { Config } from '../internal/Config.js';

export async function pullFile<Context extends Executor>(
  ctx: Context,
  params: { path: string },
  config?: Config<Context>
): Promise<ArrayBuffer> {
  const response = await ctx.execute(
    { method: 'GET', path: 'file', params },
    config
  );
  return response.arrayBuffer();
}
