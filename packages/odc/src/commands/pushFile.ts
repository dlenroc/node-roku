import type { Executor } from '../Executor.js';
import type { Config } from '../internal/Config.js';

export async function pushFile<Context extends Executor>(
  ctx: Context,
  params: {
    path: string;
    content: string | ArrayBuffer;
  },
  config?: Config<Context>
): Promise<void> {
  const { content: data, ...qs } = params;
  await ctx.execute({ method: 'PUT', path: 'file', params: qs, data }, config);
}
