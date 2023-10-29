import type { Executor } from '../Executor.js';
import { execute, type Config } from '../internal/execute.js';
import type { MemoryStats } from '../types/MemoryStats.ts';

const memoryPattern =
  /Mem:\s*(?<total>\d+)\s*(?<used>\d+)\s*(?<free>\d+)\s*(?<shared>\d+)\s*(?<cache>\d+)\s*(?<available>\d+)/;
const swapPattern = /Swap:\s*(?<total>\d+)\s*(?<used>\d+)\s*(?<free>\d+)/;

/**
 * Returns memory stats.
 */
export async function getMemoryStats<Context extends Executor<{}>>(
  ctx: Context,
  config?: Config<Context>
): Promise<MemoryStats> {
  const [[memory], [swap]] = await execute(
    ctx,
    'free',
    [],
    [memoryPattern, swapPattern],
    config
  );
  return {
    mem: {
      total: +memory.groups!.total,
      used: +memory.groups!.used,
      free: +memory.groups!.free,
      shared: +memory.groups!.shared,
      cache: +memory.groups!.cache,
      available: +memory.groups!.available,
    },
    swap: {
      total: +swap.groups!.total,
      used: +swap.groups!.used,
      free: +swap.groups!.free,
    },
  };
}
