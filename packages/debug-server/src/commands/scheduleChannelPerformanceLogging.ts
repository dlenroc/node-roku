import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';

const pattern = /^channel: .+?(\nrepeat (\d+)s \(on dev console\).*)?$/;

/**
 * Schedule the channel to report its memory and CPU utilization to the dev console at a regular interval.
 */
export async function scheduleChannelPerformanceLogging<
  Context extends Executor
>(
  ctx: Context,
  payload: {
    /**
     * Report interval in seconds for dev console (0 to disable).
     */
    interval: number;
  },
  config?: Config<Context>
): Promise<number> {
  const [[result]] = await execute(
    ctx,
    `chanperf -r ${payload.interval}`,
    [pattern],
    config
  );
  return +result[2] || 0;
}
