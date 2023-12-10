import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';

export async function pushFile<Context extends Executor>(
  ctx: Context,
  payload: {
    path: string;
    content: string | ArrayBuffer;
  },
  config?: Config<Context>
): Promise<void> {
  const { content: data, ...qs } = payload;
  await execute(ctx, { method: 'PUT', path: 'file', params: qs, data }, config);
}
