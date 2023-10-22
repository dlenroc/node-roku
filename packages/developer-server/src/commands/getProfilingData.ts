import type { Executor } from '../executor/Executor.ts';
import { execute } from '../internal/execute.js';
import { getPluginInspectCommand } from '../internal/getPluginInspectCommand.js';

/**
 * Get profiling data.
 */
export async function getProfilingData(ctx: Executor): Promise<Blob> {
  await execute(ctx, getPluginInspectCommand('dloadProf'));
  return execute(ctx, { method: 'GET', path: 'pkgs/channel.bsprof' });
}
