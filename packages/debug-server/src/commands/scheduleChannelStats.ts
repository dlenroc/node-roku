import type { Executor } from '../executors/Executor.ts';
import { execute } from '../internal/execute.ts';

const pattern = /^channel: .+?(\nrepeat (\d+)s \(on dev console\).*)?$/;

/**
 * Schedule the channel to report its memory and CPU utilization to the dev console at a regular interval.
 */
export async function scheduleChannelStats(executor: Executor, intervalInSeconds: number): Promise<number> {
  const [[result]] = await execute(executor, 'chanperf', ['-r', `${intervalInSeconds}`], [pattern]);
  return +result[2] || 0;
}
