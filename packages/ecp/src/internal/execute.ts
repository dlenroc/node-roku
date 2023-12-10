import { ECPError } from '../ECPError.js';
import type { Executor } from '../Executor.ts';
import type { Config } from './types.d.ts';

export async function execute<Context extends Executor>(
  ctx: Context,
  path: string,
  params?: Record<string, unknown>,
  config?: Config<Context>
): Promise<Response> {
  if (params && Object.keys(params).length) {
    const newParams = Object.entries(params).reduce((result, [key, value]) => {
      result[key] = ['string', 'number', 'boolean'].includes(typeof value)
        ? (value as string)
        : JSON.stringify(value);
      return result;
    }, {} as Record<string, string>);

    path += '?' + new URLSearchParams(newParams);
  }

  const method = path.startsWith('query/') ? 'GET' : 'POST';
  const response = await ctx.execute(path, { ...config!, method });

  if (!response.ok) {
    throw new ECPError(`${path} -> ${response.status} ${response.statusText}`);
  }

  return response;
}
