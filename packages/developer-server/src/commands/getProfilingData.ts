import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';
import { getPluginInspectCommand } from '../internal/getPluginInspectCommand.js';

/**
 * Get profiling data.
 */
export async function getProfilingData<Context extends Executor<{}>>(
  ctx: Context,
  config?: Config<Context>
): Promise<Blob> {
  await execute(ctx, getPluginInspectCommand('dloadProf'), config);
  return execute(ctx, { path: 'pkgs/channel.bsprof' }, config);
}
