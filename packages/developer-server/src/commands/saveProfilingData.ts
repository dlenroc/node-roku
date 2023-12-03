import type { Executor } from '../Executor.ts';
import { executePluginInspectCommand } from '../internal/executePluginInspectCommand.js';
import type { Config } from '../internal/types.d.ts';

/**
 * Saves the profiling data and returns the path to it.
 */
export async function saveProfilingData<Context extends Executor>(
  ctx: Context,
  config?: Config<Context>
): Promise<string | null> {
  const body = await executePluginInspectCommand(ctx, 'dloadProf', config);
  return body.match(/pkgs\/channel\.bsprof/)?.[0] ?? null;
}
