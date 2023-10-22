import type { Executor } from '../executors/Executor.ts';
import { execute } from '../internal/execute.js';

const pattern = /<[\s\S]+>/;

/**
 * Returns SceneGraph nodes.
 */
export async function getSceneGraphNodes(executor: Executor, node: string): Promise<string> {
  const [[result]] = await execute(executor, 'sgnodes', [node], [pattern]);
  return result[0];
}
