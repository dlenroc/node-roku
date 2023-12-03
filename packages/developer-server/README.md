# @dlenroc/roku-developer-server · [![NPM Version](https://img.shields.io/npm/v/@dlenroc/roku-developer-server)](https://www.npmjs.com/package/@dlenroc/roku-developer-server)

Client for [host utilities](https://developer.roku.com/en-gb/docs/developer-program/getting-started/developer-setup.md) provided via a web page at `http://<ip>`

## Installation

```sh
npm install @dlenroc/roku-developer-server
```

## Usage

```typescript
import {
  DeveloperServerExecutor,
  installChannel,
} from '@dlenroc/roku-developer-server';
import fs from 'node:fs';

const ctx = new DeveloperServerExecutor({
  address: 'http://<ip>',
  username: '<username>',
  password: '<password>',
});

const app = fs.readFileSync('<path_to_channel>');
await installChannel(ctx, { content: app });
```

---

| Method              | Description                                                |
| ------------------- | ---------------------------------------------------------- |
| `convertToSquashfs` | Compress sideloaded channel using Squashfs                 |
| `convertToZip`      | Compress sideloaded channel using Zip                      |
| `deleteChannel`     | Delete sideloaded channel                                  |
| `deletePackage`     | Delete sideloaded channel package                          |
| `getPackage`        | Get sideloaded channel package                             |
| `getProfilingData`  | Get profiling data                                         |
| `getScreenshot`     | Get sideloaded channel screenshot                          |
| `inspectPackage`    | Inspect package                                            |
| `installChannel`    | Sideload a channel from a zip file                         |
| `packageChannel`    | Package sideloaded channel                                 |
| `rekey`             | Rekey device from existing package signed with desired key |
