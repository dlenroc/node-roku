import { DeveloperServerError } from '../DeveloperServerError.js';
import type { Executor } from '../executor/Executor.ts';
import { parseRokuMessages } from './parseRokuMessages.js';

export async function execute<T>(
  executor: Executor,
  request: {
    method: string;
    path: string;
    form?: Record<string, string | Blob>;
  }
): Promise<Blob> {
  const response = await executor.execute(request);

  if (response.status !== 200) {
    throw new DeveloperServerError({
      method: request.method,
      path: request.path,
      payload: request.form,
      result: `Request failed with status ${
        response.status
      } ${await response.body.text()}`,
    });
  }

  if (response.body.type.match(/text\//)) {
    const text = await response.body.text();

    // console.log('text<<<<<<<<<<<<<<<<<<', text);

    const results = parseRokuMessages(text);
    if (results.errors.length > 0) {
      throw new DeveloperServerError({
        method: request.method,
        path: request.path,
        payload: request.form,
        result: results.errors.join('\n'),
      });
    }
  }

  return response.body;
}
