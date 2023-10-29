import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';

const pattern = /<[\s\S]+>/;

/**
 * Returns SceneGraph nodes.
 */
export async function getSceneGraphNodes<Context extends Executor<{}>>(
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
    'sgnodes',
    [payload.query],
    [pattern],
    config
  );
  return result[0];
}
