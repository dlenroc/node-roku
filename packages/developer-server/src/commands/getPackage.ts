import { DeveloperServerError } from '../DeveloperServerError.ts';
import type { Executor } from '../executor/Executor.ts';
import { execute } from '../internal/execute.ts';

/**
 * Get sideloaded channel package.
 */
export async function getPackage(ctx: Executor): Promise<Blob> {
  const command = { method: 'GET', path: 'plugin_package' };
  const body = await execute(ctx, command);
  const bodyText = await body.text();
  const pkgPath = bodyText.match(/pkgs\/.+?\.pkg/)?.[0];
  if (!pkgPath) {
    throw new DeveloperServerError({
      ...command,
      result: 'Could not find package path in response body.',
    });
  }

  return execute(ctx, {
    method: 'GET',
    path: pkgPath,
  });
}
