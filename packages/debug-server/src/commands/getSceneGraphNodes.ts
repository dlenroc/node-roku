import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';

const pattern = /<[\s\S]+>/;

/**
 * Returns SceneGraph nodes.
 */
export async function getSceneGraphNodes<Context extends Executor>(
  ctx: Context,
  payload: {
    /**
     * Node id or filter.
     */
    query: 'all' | 'roots' | string;
  },
  config?: Config<Context>
): Promise<string> {
  const [[result]] = await execute(
    ctx,
    `sgnodes ${payload.query}`,
    [pattern],
    config
  );
  return result[0];
}
