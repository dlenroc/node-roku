import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';

const pattern = /^channel: .+?(\nrepeat (\d+)s \(on dev console\).*)?$/;

/**
 * Schedule the channel to report its memory and CPU utilization to the dev console at a regular interval.
 */
export async function scheduleChannelPerformanceLogging<
  Context extends Executor<{}>
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
  const args = payload ? ['-r', `${payload.interval}`] : [];
  const [[result]] = await execute(ctx, 'chanperf', args, [pattern], config);
  return +result[2] || 0;
}
