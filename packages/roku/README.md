# @dlenroc/roku · [![NPM Version](https://img.shields.io/npm/v/@dlenroc/roku)](https://www.npmjs.com/package/@dlenroc/roku)

An entry point that can be used to access all other packages

## Installation

```sh
npm install @dlenroc/roku
```

## Usage

```typescript
import fs from 'node:fs';
import SDK from '@dlenroc/roku';

const sdk = new SDK('<ip>', '<username>', '<password>');
const app = fs.readFileSync('<path_to_channel>');
const patchedApp = await sdk.odc.extend(app);

await sdk.ecp.keypress('Home');
await sdk.debugServer.generateDeveloperKey();
await sdk.developerServer.install(patchedApp);

...
```

---

The following components are available into sdk instance

- `debugServer` [@dlenroc/roku-debug-server](/packages/debug-server#readme)
- `developerServer` [@dlenroc/roku-developer-server](/packages/developer-server#readme)
- `document` [@dlenroc/roku-dom](/packages/dom#readme)
- `ecp` [@dlenroc/roku-ecp](/packages/ecp#readme)
- `odc` [@dlenroc/roku-odc](/packages/odc#readme)
