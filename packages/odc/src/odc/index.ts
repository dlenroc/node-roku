import { createHash } from 'crypto';
import JSZip from 'jszip';
// @ts-ignore
import clientGetAppUI from './client_commands/getAppUI.brs';
// @ts-ignore
import clearRegistry from './commands/clearRegistry.brs';
// @ts-ignore
import getAppUI from './commands/getAppUI.brs';
// @ts-ignore
import getRegistry from './commands/getRegistry.brs';
// @ts-ignore
import patchRegistry from './commands/patchRegistry.brs';
// @ts-ignore
import http from './http.brs';
// @ts-ignore
import server from './server.brs';
// @ts-ignore
import manifest from './server.xml';
// @ts-ignore
import main from './source/odc_main.brs';
// @ts-ignore
import utils from './utils.brs';

export default async function extend(app: Buffer): Promise<Buffer> {
  const zip = await JSZip.loadAsync(app);

  // patch manifest
  const md5 = createHash('md5').update(app).digest('hex');
  let manifestSource = await zip.file('manifest')?.async('string');
  if (manifestSource) {
    zip.file('manifest', manifestSource.replace(/(^\s*title\s*=.+)/im, `$1 | ${md5}`));
  }

  // install component
  zip.file('components/odc/http.brs', http);
  zip.file('components/odc/server.xml', manifest);
  zip.file('components/odc/server.brs', server);
  zip.file('components/odc/utils.brs', utils);
  zip.file('components/odc/client_commands/getAppUI.brs', clientGetAppUI);
  zip.file('components/odc/commands/clearRegistry.brs', clearRegistry);
  zip.file('components/odc/commands/getAppUI.brs', getAppUI);
  zip.file('components/odc/commands/getRegistry.brs', getRegistry);
  zip.file('components/odc/commands/patchRegistry.brs', patchRegistry);
  zip.file('source/odc_main.brs', main);

  // patch entry points
  const pattern = /(\.show\(\))/i;
  const entryPointMatcher = /(^\s*(sub|function)\s+(main|runuserinterface)\s*\()\s*([\w$%!#&]+)?\s*[^)]*(\)[^:\r\n]*)/gim;
  for (const file of zip.file(/^source\/.*\.brs$/i)) {
    let source = await file.async('string');
    let content = source;

    // SceneGraph
    content = content.replace(pattern, '$1 : createObject("roSGNode", "ODC")');

    // Source
    content = content.replace(entryPointMatcher, (...groups: string[]) => {
      const methodParameter = groups[4] || 'options';
      const methodDeclaration = groups[4] ? groups[0] : groups[1] + methodParameter + groups[5];
      return methodDeclaration + `: odc_main(${methodParameter})`;
    });

    if (source != content) {
      zip.file(file.name, content);
    }
  }

  // patch scenes
  const isScenePattern = /<component .*extends="(Base)?Scene"/i;
  const endSceneComponentPattern = /(<\/component>)/i;
  const endInterfaceComponentPattern = /(<\/interface>)/i;
  for (const file of zip.file(/^components\/.*\.xml$/i)) {
    let content = await file.async('string');

    if (!isScenePattern.test(content)) {
      continue;
    }

    if (endInterfaceComponentPattern.test(content)) {
      content = content.replace(endInterfaceComponentPattern, `<function name="odc_get_source"/>$1`);
    } else {
      content = content.replace(endSceneComponentPattern, `<interface><function name="odc_get_source"/></interface>$1`);
    }

    content = content.replace(endSceneComponentPattern, `<script type="text/brightscript" uri="pkg:/components/odc/client_commands/getAppUI.brs"/>$1`);

    zip.file(file.name, content);
  }

  return await zip.generateAsync({ type: 'nodebuffer' });
}
