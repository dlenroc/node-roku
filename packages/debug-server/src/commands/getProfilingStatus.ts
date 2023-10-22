import type { Executor } from '../executors/Executor.ts';
import { execute } from '../internal/execute.js';
import type { ProfilingStatus } from '../types/ProfilingStatus.ts';

const pattern = /status: (\w+),?(.*),data_dest=(\w+)/;

/**
 * Returns profiling status.
 */
export async function getProfilingStatus(executor: Executor): Promise<ProfilingStatus> {
  const [[matches]] = await execute(executor, 'bsprof-status', [], [pattern]);
  return {
    resumed: matches[1] === 'running',
    metrics: matches[2] ? matches[2].split(',') : [],
    destination: matches[3],
  };
}
