import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';

export async function patchRegistry<Context extends Executor>(
  ctx: Context,
  params: Record<string, null | Record<string, any>>,
  config?: Config<Context>
): Promise<void> {
  await execute(
    ctx,
    {
      method: 'PATCH',
      path: 'registry',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(params),
    },
    config
  );
}
