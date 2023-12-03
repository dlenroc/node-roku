# @dlenroc/roku-developer-server · [![NPM Version](https://img.shields.io/npm/v/@dlenroc/roku-developer-server)](https://www.npmjs.com/package/@dlenroc/roku-developer-server)

Client for [host utilities](https://developer.roku.com/en-gb/docs/developer-program/getting-started/developer-setup.md) provided via a web page at `http://<ip>`

## Installation

```sh
npm install @dlenroc/roku-developer-server
```

## Usage

```typescript
import { DeveloperServerExecutor, installChannel } from '@dlenroc/roku-developer-server';
import fs from 'node:fs';

const ctx = new DeveloperServerExecutor({
  address: 'http://<ip>',
  username: '<username>',
  password: '<password>',
});

const app = fs.readFileSync('<path_to_channel>');
await installChannel(ctx, { content: app });
```

📝 Retrieving content from methods returning file paths requires an extra request.

```typescript
const path = await takeScreenshot(ctx);
const response = await ctx.execute(path);
const content = await response.arrayBuffer();
```

---

| Method              | Description                                                                    |
| ------------------- | ------------------------------------------------------------------------------ |
| `convertToSquashfs` | Compress sideloaded channel using Squashfs                                     |
| `convertToZip`      | Compress sideloaded channel using Zip                                          |
| `deleteChannel`     | Delete sideloaded channel                                                      |
| `deletePackage`     | Delete sideloaded channel package                                              |
| `inspectPackage`    | Inspect channel package                                                        |
| `installChannel`    | Sideload a channel from a zip file                                             |
| `packageChannel`    | Package sideloaded channel and return path to it                               |
| `rekey`             | Rekey device from existing package signed with desired key                     |
| `saveProfilingData` | Saves the profiling data and returns the path to it                            |
| `takeScreenshot`    | Takes a screenshot of the sideloaded channel and returns the path to the image |
