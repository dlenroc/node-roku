import type { Executor } from '../executors/Executor.ts';
import { execute } from '../internal/execute.ts';
import { MemoryStats } from '../types/MemoryStats.ts';

const memoryPattern = /Mem:\s*(?<total>\d+)\s*(?<used>\d+)\s*(?<free>\d+)\s*(?<shared>\d+)\s*(?<cache>\d+)\s*(?<available>\d+)/;
const swapPattern = /Swap:\s*(?<total>\d+)\s*(?<used>\d+)\s*(?<free>\d+)/;

/**
 * Returns memory stats.
 */
export async function getMemoryStats(executor: Executor): Promise<MemoryStats> {
  const [[memory], [swap]] = await execute(executor, 'free', [], [memoryPattern, swapPattern]);
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
