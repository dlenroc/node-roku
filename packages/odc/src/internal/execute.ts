import type { Executor } from '../Executor.ts';
import { ODCError } from '../ODCError.js';
import type { Config, Mixed } from './types.d.ts';

export async function execute<Context extends Executor>(
  ctx: Context,
  request: {
    method: string;
    path: string;
    headers?: null | undefined | Record<string, string>;
    params?: null | undefined | Record<string, unknown>;
    data?: null | undefined | RequestInit['body'];
  },
  config?: Config<Context>
): Promise<Response> {
  let path = request.path;

  if (request.params) {
    const params = Object.entries(request.params).reduce(
      (result, [key, value]) => {
        result[key] = ['string', 'number', 'boolean'].includes(typeof value)
          ? value
          : JSON.stringify(value);
        return result;
      },
      {} as Record<string, any>
    );

    path += '?' + new URLSearchParams(params);
  }

  const requestInit: Mixed<RequestInit, Config<Context>> = {
    ...config!,
    method: request.method,
  };

  if (request.headers) {
    requestInit.headers = request.headers;
  }

  if (request.data) {
    requestInit.body = request.data;
  }

  const response = await ctx.execute(path, requestInit);

  if (!response.ok) {
    const json: any = await response.json();

    let trace = json.backtrace?.reverse() || [];
    let message =
      json.message || `${request.method} /${path} -> ${response.status}`;
    let error = message;

    if (trace.length) {
      error += '\n    at ';
      error += trace
        .map(
          (trace: any) =>
            trace.function.replace(/\(.+/, '') +
            ' (' +
            trace.filename +
            ':' +
            trace.line_number +
            ')'
        )
        .join('\n    at ');
    }

    throw new ODCError(error);
  }

  return response;
}
