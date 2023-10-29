import { DebugServerError } from '../DebugServerError.js';
import type { Executor } from '../Executor.js';

export type Config<T> = T extends Executor<infer O> ? O : never;

export async function execute<Context extends Executor<{}>>(
  ctx: Context,
  cmd: string,
  args: string[],
  patterns: RegExp[],
  config?: Config<Context>
): Promise<any> {
  const result = await ctx.execute(cmd, args, ...(config ? [config] : []));

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
    throw new DebugServerError({ cmd, args, output: result });
  }

  return matches;
}
