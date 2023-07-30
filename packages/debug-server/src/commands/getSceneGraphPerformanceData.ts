import { Executor } from '../executors/Executor.ts';
import { execute } from '../internal/execute.ts';
import { SceneGraphPerformance } from '../types/SceneGraphPerformance.ts';

const pattern = /thread node calls: .+(?<calls>\d+)\s+\+\s+op\s+(?<op>\d+)\s+@\s+(?<rendezvous>\d+\.\d+)%/g;

/**
 * Returns SceneGraph performance data.
 */
export async function getSceneGraphPerformanceData(executor: Executor): Promise<SceneGraphPerformance[]> {
  const [matches] = await execute(executor, 'sgperf', ['report'], [pattern]);
  return matches.map((match) => ({
    create: +match.groups!.calls,
    operation: +match.groups!.op,
    rendezvous: +match.groups!.rendezvous,
  }));
}
