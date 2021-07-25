import { createHash } from 'crypto';
import { promises as fs } from 'fs';
import JSZip from 'jszip';
import path, { relative } from 'path';

export default async function extend(app: Buffer): Promise<Buffer> {
  const root = `${__dirname}/../src`;
  const zip = await JSZip.loadAsync(app);

  // patch manifest
  const md5 = createHash('md5').update(app).digest('hex');
  let manifest = await zip.file('manifest')?.async('string');
  if (manifest) {
    let hasTitle = false;

    manifest = manifest.replace(/^\s*((screensaver_)?title)\s*=(.+)/gim, (...groups: string[]) => {
      if (!groups[2]) hasTitle = true;
      return `${groups[1]}=${groups[3]} | ${md5}`;
    });

    if (!hasTitle) {
      const title = manifest.match(/^\s*((screensaver_)?title)\s*=(.+) \| /im)?.[3] || '(dev)';
      manifest += `\ntitle=${title} | ${md5}`;
    }

    zip.file('manifest', manifest);
  }

  // inject source
  let sources = await buildBrightScript('../src/odc/main.brs');
  for (const [path, content] of Object.entries(sources)) {
    zip.file(`source/${relative(root, path)}`, content);
  }

  // inject server component
  sources = await buildBrightScript('../src/odc/server.brs');
  for (const [path, content] of Object.entries(sources)) {
    zip.file(`components/${relative(root, path)}`, content);
  }

  let serverDependencies = Object.keys(sources)
    .map((path) => `<script type="text/brightscript" uri="pkg:/${`components/${relative(root, path)}`}"/>`)
    .join('');

  let component = await fs.readFile(path.resolve(__dirname, '../src/odc/server.xml'), 'utf8');
  component = component.replace('</component>', `${serverDependencies}</component>`);
  zip.file('components/odc/server.xml', component);

  // inject client component
  sources = await buildBrightScript('../src/odc/client.brs');
  for (const [path, content] of Object.entries(sources)) {
    zip.file(`components/${relative(root, path)}`, content);
  }

  let clientDependencies = Object.keys(sources)
    .map((path) => `<script type="text/brightscript" uri="pkg:/${`components/${relative(root, path)}`}"/>`)
    .join('');

  // patch entry points
  let hasMain = false;
  const pattern = /(\.show\(\))/gim;
  const entryPointMatcher = /(^\s*(sub|function)\s+(main|runuserinterface)\s*\()\s*([\w$%!#&]+)?\s*[^)]*(\)[^:\r\n]*)/gim;
  for (const file of zip.file(/^source\/.*\.brs$/i)) {
    let source = await file.async('string');
    let content = source
      .replace(pattern, '$1 : createObject("roSGNode", "ODC")')
      .replace(entryPointMatcher, (...groups: string[]) => {
        hasMain = true;

        const parameter = groups[4] || 'options';
        const methodDeclaration = groups[4] ? groups[0] : groups[1] + parameter + groups[5];
        return methodDeclaration + `: odc_main(${parameter})`;
      });

    if (source != content) {
      zip.file(file.name, content);
    }
  }

  if (!hasMain) {
    zip.file('source/odc/odc_main.brs', 'sub Main(options) : options.odc_entry_point = "screensaver" : odc_main(options) : end sub');
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
      content = content.replace(endInterfaceComponentPattern, `<function name="odc_getAppUI"/>$1`);
    } else {
      content = content.replace(endSceneComponentPattern, `<interface><function name="odc_getAppUI"/></interface>$1`);
    }

    content = content.replace(endSceneComponentPattern, `${clientDependencies}$1`);

    zip.file(file.name, content);
  }

  return await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: {
      level: 1,
    },
  });
}

async function buildBrightScript(input: string) {
  const files = new Set<string>();
  const methods = new Set<string>();
  const sources: Record<string, string> = {};
  const importPattern = /^'\s+import\s+'(.+?)'/gim;
  const functionPattern = /^\s*(sub|function)\s+(.+?)\s*\(/gim;

  await resolveDependencies(path.resolve(__dirname, input));

  for (let [key, value] of Object.entries(sources)) {
    for (let method of methods) {
      if (method.toLowerCase() !== 'init') {
        value = value.replace(RegExp(`([^\w])(${method})([^\w])`, 'ig'), `$1odc_$2$3`);
      }
    }

    sources[key] = value;
  }

  return sources;

  async function resolveDependencies(source: string) {
    if (!files.add(source)) {
      return;
    }

    const content = await fs.readFile(source, { encoding: 'utf-8' });

    for (const match of content.matchAll(importPattern)) {
      await resolveDependencies(path.resolve(path.dirname(source), match[1]));
    }

    for (const match of content.matchAll(functionPattern)) {
      methods.add(match[2]);
    }

    sources[source] = content;
  }
}
