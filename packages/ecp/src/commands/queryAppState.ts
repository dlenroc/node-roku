import type { Executor } from '../Executor.ts';
import { execute } from '../internal/execute.js';
import type { Config } from '../internal/types.ts';
import parse from '../internal/xml.js';
import type { AppId } from '../types/AppId.ts';
import type { AppState } from '../types/AppState.ts';
import type { Failure } from '../types/Failure.ts';

export async function queryAppState<Context extends Executor>(
  ctx: Context,
  payload: { appId: AppId },
  config?: Config<Context>
): Promise<Failure | AppState> {
  const response = await execute(
    ctx,
    `query/app-state/${payload.appId}`,
    undefined,
    config
  );
  return parse(await response.text());
}
