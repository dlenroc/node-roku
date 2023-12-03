import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import type { SceneGraphPerformance } from '../types/SceneGraphPerformance.ts';

const pattern =
  /thread node calls: .+(?<calls>\d+)\s+\+\s+op\s+(?<op>\d+)\s+@\s+(?<rendezvous>\d+\.\d+)%/g;

/**
 * Returns SceneGraph performance data.
 */
export async function getSceneGraphPerformanceMetrics<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<SceneGraphPerformance[]> {
  const [matches] = await execute(ctx, 'sgperf report', [pattern], config);
  return matches.map((match: any) => ({
    create: +match.groups!.calls,
    operation: +match.groups!.op,
    rendezvous: +match.groups!.rendezvous,
  }));
}
