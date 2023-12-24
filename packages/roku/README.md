# @dlenroc/roku · [![NPM Version](https://img.shields.io/npm/v/@dlenroc/roku)](https://www.npmjs.com/package/@dlenroc/roku)

An entry point that can be used to access all other packages

## Installation

```sh
npm install @dlenroc/roku
```

## Usage

```typescript
import { SDK } from '@dlenroc/roku';
import { installChannel } from '@dlenroc/roku-developer-server';
import { readFileSync } from 'node:fs';

const sdk = new SDK({
  hostname: '<ip>',
  username: '<username>',
  password: '<password>',
});

const content = readFileSync('app.zip');
await installChannel(sdk.developerServer, { content });
```

---

The following components are available into sdk instance

- `debugServer` [@dlenroc/roku-debug-server](https://www.npmjs.com/package/@dlenroc/roku-debug-server)
- `developerServer` [@dlenroc/roku-developer-server](https://www.npmjs.com/package/@dlenroc/roku-developer-server)
- `ecp` [@dlenroc/roku-ecp](https://www.npmjs.com/package/@dlenroc/roku-ecp)
- `odc` [@dlenroc/roku-odc](https://www.npmjs.com/package/@dlenroc/roku-odc)
