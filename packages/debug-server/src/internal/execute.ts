import { DebugServerParsingError } from '../DebugServerParsingError.js';
import type { Executor } from '../executors/Executor.ts';

export async function execute<T>(
  executor: Executor,
  cmd: string,
  args: string[],
  patterns: RegExp[]
): Promise<RegExpMatchArray[][]> {
  const result = await executor.execute(cmd, args);

  const matches: RegExpMatchArray[][] = [];

  for (const pattern of patterns) {
    if (pattern.global) {
      const matchArray = [...result.matchAll(pattern)];
      if (matchArray.length > 0) {
        matches.push(matchArray);
      }
    } else {
      const match = result.match(pattern);
      if (match !== null) {
        matches.push([match]);
      }
    }
  }

  if (matches.length === 0) {
    throw new DebugServerParsingError({ cmd, args, result });
  }

  return matches;
}
