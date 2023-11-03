import { DeveloperServerError } from '../DeveloperServerError.js';
import type { Executor } from '../Executor.js';
import { parseRokuMessages } from './parseRokuMessages.js';

export type Config<T> = T extends Executor<infer O> ? O : never;

export async function execute<Context extends Executor<{}>>(
  ctx: Context,
  request: {
    path: string;
    body?: Record<string, string | Blob> | undefined;
  },
  config?: Config<Context>
): Promise<Blob> {
  const response = await ctx.execute(request, config);

  if (response.status !== 200) {
    throw new DeveloperServerError({
      message: `Request failed with status ${response.status}`,
      path: request.path,
      params: request.body,
      output: await response.body.text(),
    });
  }

  if (response.body.type.match(/text\//)) {
    const text = await response.body.text();
    const results = parseRokuMessages(text);
    if (results.errors.length > 0) {
      throw new DeveloperServerError({
        message: results.errors.join('\n'),
        path: request.path,
        params: request.body,
        output: text
      });
    }
  }

  return response.body;
}
