import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.d.ts';
import type { Plugin } from '../types/Plugin.ts';

const pattern =
  /(?<id>\S+)\s+\[usg\s+(?<usg>\d+)\]\s+\[ref\s+(?<ref>\d+)\]\s+(?<cmpl>cmpl)?(?<run>\*)?\s+(?<name>.+),\s+(?<version>\d+\.\d+\.\d+)/gm;

/**
 * Returns installed plugins.
 */
export async function getPlugins<Context extends Executor>(
  ctx: Context,
  payload?: {
    /**
     * Plugin id or name to search for.
     */
    query?: number | string;
  },
  config?: Config<Context>
): Promise<{ plugins: Plugin[] }> {
  const [results] = await execute(
    ctx,
    `plugins${payload?.query ? ` ${payload.query}` : ''}`,
    [pattern],
    config
  );
  const plugins = results.map((match: any) => {
    const id = +match.groups!.id;
    return {
      id: isNaN(id) ? match.groups!.id : id,
      is_running: !!match.groups!.run,
      name: match.groups!.name,
      version: match.groups!.version,
    };
  });

  return { plugins };
}
