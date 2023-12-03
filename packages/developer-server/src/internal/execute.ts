import { DeveloperServerError } from '../DeveloperServerError.js';
import type { Executor } from '../Executor.ts';
import { parseRokuMessages } from './parseRokuMessages.js';
import type { Config, Mixed } from './types.d.ts';

export async function execute<Context extends Executor>(
  ctx: Context,
  path: string,
  init?: Mixed<RequestInit, Config<Context>>
): Promise<string> {
  const response = await ctx.execute(path, init);

  if (response.status !== 200) {
    throw new DeveloperServerError({
      message: `Request failed with status ${response.status}`,
      path: path,
      params: {},
      output: '',
    });
  }

  const text = await response.text();
  const results = parseRokuMessages(text);
  if (results.errors.length > 0) {
    throw new DeveloperServerError({
      message: results.errors.join('\n'),
      path: path,
      params: {},
      output: text,
    });
  }

  return text;
}
