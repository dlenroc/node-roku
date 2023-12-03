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

  const text = await response.text();
  const results = parseRokuMessages(text);
  if (!response.ok || results.errors.length) {
    const message = Object.entries(results).reduce(
      (acc, [key, messages]) =>
        messages.length
          ? `${acc}\n[${key}]\n${messages.join('\n').replaceAll(/^/gm, '  ')}\n`
          : acc,
      ''
    );

    throw new DeveloperServerError({
      message: `Request to "${path}" failed: ${response.status} ${response.statusText}${message}`,
      path,
      payload: init!,
      response: new Response(text, response),
    });
  }

  return text;
}
