import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import type { ChannelStats } from '../types/ChannelStats.ts';

const pattern =
  /mem=(?<mem>\d+)KiB{anon=(?<anon>\d+),file=(?<file>\d+),shared=(?<shared>\d+),swap=(?<swap>\d+)},%cpu=(?<cpu>\d+){user=(?<user>\d+),sys=(?<sys>\d+)}/;

/**
 * Returns channel CPU and memory usage in KibiBytes [KiB].
 *
 * The channel manifest must include the **run_as_process=1** attribute to use this command.
 */
export async function getChannelPerformanceStats<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<ChannelStats> {
  const [[result]] = await execute(ctx, 'chanperf', [pattern], config);

  return {
    cpu: {
      total: +result.groups!.cpu,
      user: +result.groups!.user,
      sys: +result.groups!.sys,
    },
    memory: {
      total: +result.groups!.mem,
      anon: +result.groups!.anon,
      swap: +result.groups!.swap,
      file: +result.groups!.file,
      shared: +result.groups!.shared,
    },
  };
}
