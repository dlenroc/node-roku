import type { Executor } from '../executors/Executor.ts';
import { execute } from '../internal/execute.ts';
import { Plugin } from '../types/Plugin.ts';

const pattern = /(?<id>\S+)\s+\[usg\s+(?<usg>\d+)\]\s+\[ref\s+(?<ref>\d+)\]\s+(?<cmpl>cmpl)?(?<run>\*)?\s+(?<name>.+),\s+(?<version>\d+\.\d+\.\d+)/gm;

/**
 * Returns installed plugins.
 */
export async function getPlugins(executor: Executor, idOrName?: number | string): Promise<{ plugins: Plugin[] }> {
  const args = idOrName ? [`${idOrName}`] : [];
  const [results] = await execute(executor, 'plugins', args, [pattern]);
  const plugins = results.map((match) => {
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
