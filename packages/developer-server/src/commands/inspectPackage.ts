import type { Executor } from '../Executor.ts';
import { executePluginInspectCommand } from '../internal/executePluginInspectCommand.js';
import type { Config } from '../internal/types.d.ts';

/**
 * Inspect package.
 */
export async function inspectPackage<Context extends Executor>(
  ctx: Context,
  option: {
    /**
     * Package to inspect.
     */
    content: Exclude<ConstructorParameters<typeof Blob>[0][0], string>;

    /**
     * Password used to sign the package.
     */
    password: string;
  },
  config?: Config<Context>
): Promise<
  Record<string, string> & {
    appName?: string;
    creationDate?: Date;
    devId?: string;
    devZip?: string;
  }
> {
  const bodyText = await executePluginInspectCommand(
    ctx,
    {
      mysubmit: 'Inspect',
      archive: new Blob([option.content]),
      passwd: option.password,
    },
    config
  );

  const results: Record<string, any> = {};

  const tableCellsPattern =
    /(\s*\w+.insertCell\()0(\).innerHTML = ')(.+?)';\n\1[1]\2(.+?)'/g;
  for (const match of bodyText.matchAll(tableCellsPattern)) {
    const value = match[4]?.replace(/<[^>]*>?/gm, '');
    const key = match[3]
      ?.match(/\w+/g)
      ?.map((it, i) =>
        i === 0
          ? it.toLowerCase()
          : it[0]!.toUpperCase() + it.slice(1).toLowerCase()
      )
      .join('');

    if (key && value) {
      results[key] = value;
    }
  }

  const creationDateMatch = bodyText.match(/dd = new Date\((\d+)/);
  if (creationDateMatch) {
    results['creationDate'] = new Date(+creationDateMatch[1]!);
  }

  return results;
}
