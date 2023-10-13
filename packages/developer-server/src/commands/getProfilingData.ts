import type { Executor } from '../executor/Executor.ts';
import { execute } from '../internal/execute.ts';
import { getPluginInspectCommand } from '../internal/getPluginInspectCommand.ts';

/**
 * Get profiling data.
 */
export async function getProfilingData(ctx: Executor): Promise<Blob> {
  await execute(ctx, getPluginInspectCommand('dloadProf'));
  return execute(ctx, { method: 'GET', path: 'pkgs/channel.bsprof' });
}
