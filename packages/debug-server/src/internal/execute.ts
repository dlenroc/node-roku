import { DebugServerError } from '../DebugServerError.js';
import type { Executor } from '../Executor.ts';
import type { Config } from './types.d.ts';

export async function execute<Context extends Executor>(
  ctx: Context,
  command: string,
  patterns: RegExp[],
  config?: Config<Context>
): Promise<any> {
  const output = await ctx.execute(command, ...(config ? [config] : []));

  const matches: RegExpMatchArray[][] = [];

  for (const pattern of patterns) {
    if (pattern.global) {
      const matchArray = [...output.matchAll(pattern)];
      if (matchArray.length > 0) {
        matches.push(matchArray);
      }
    } else {
      const match = output.match(pattern);
      if (match !== null) {
        matches.push([match]);
      }
    }
  }

  if (matches.length === 0) {
    throw new DebugServerError({ command, output });
  }

  return matches;
}
