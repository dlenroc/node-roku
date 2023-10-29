import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';
import type { ProfilingStatus } from '../types/ProfilingStatus.ts';

const pattern = /status: (\w+),?(.*),data_dest=(\w+)/;

/**
 * Returns profiling status.
 */
export async function getProfilingStatus<Context extends Executor<{}>>(
  ctx: Context,
  config?: Config<Context>
): Promise<ProfilingStatus> {
  const [[matches]] = await execute(
    ctx,
    'bsprof-status',
    [],
    [pattern],
    config
  );
  return {
    resumed: matches[1] === 'running',
    metrics: matches[2] ? matches[2].split(',') : [],
    destination: matches[3],
  };
}
