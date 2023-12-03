import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';

export async function pullFile<Context extends Executor>(
  ctx: Context,
  params: { path: string },
  config?: Config<Context>
): Promise<ArrayBuffer> {
  const response = await execute(
    ctx,
    { method: 'GET', path: 'file', params },
    config
  );
  return response.arrayBuffer();
}
