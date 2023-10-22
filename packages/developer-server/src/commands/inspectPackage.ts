import type { Executor } from '../executor/Executor.ts';
import { execute } from '../internal/execute.js';
import { getPluginInspectCommand } from '../internal/getPluginInspectCommand.js';

/**
 * Inspect package.
 */
export async function inspectPackage(
  ctx: Executor,
  option: {
    /**
     * Package to inspect.
     */
    content: Blob | NodeJS.ArrayBufferView;

    /**
     * Password used to sign the package.
     */
    password: string;
  }
): Promise<
  Record<string, string> & {
    appName?: string;
    creationDate?: Date;
    devId?: string;
    devZip?: string;
  }
> {
  const body = await execute(
    ctx,
    getPluginInspectCommand({
      mysubmit: 'Inspect',
      archive: new Blob([option.content]),
      passwd: option.password,
    })
  );

  const bodyText = await body.text();
  const results: Record<string, any> = {};

  const tableCellsPattern =
    /(\s+\w+.insertCell\()0(\).innerHTML = ')(.+?)';\n\1[1]\2(.+?)'/g;
  for (const match of bodyText.matchAll(tableCellsPattern)) {
    const value = match[4].replace(/<[^>]*>?/gm, '');
    const key = match[3]
      .match(/\w+/g)
      ?.map((it, i) =>
        i === 0
          ? it.toLowerCase()
          : it[0].toUpperCase() + it.slice(1).toLowerCase()
      )
      .join('');

    if (key && value) {
      results[key] = value;
    }
  }

  const creationDateMatch = bodyText.match(/dd = new Date\((\d+)/);
  if (creationDateMatch) {
    results.creationDate = new Date(+creationDateMatch[1]);
  }

  return results;
}
