# @dlenroc/roku-developer-server · [![NPM Version](https://img.shields.io/npm/v/@dlenroc/roku-developer-server)](https://www.npmjs.com/package/@dlenroc/roku-developer-server)

Client for [host utilities](https://developer.roku.com/en-gb/docs/developer-program/getting-started/developer-setup.md) provided via a web page at `http://<ip>`

## Installation

```sh
npm install @dlenroc/roku-developer-server
```

## Usage

```typescript
import { DeveloperServerExecutor, installChannel } from '@dlenroc/roku-developer-server';
import fs from 'fs';

const app = fs.readFileSync('<path_to_channel>');

const executor = new DeveloperServerExecutor({ address: 'http://<ip>', username: '<username>', password: '<password>' });
await installChannel(executor, app);
```

---

```typescript
convertToCramfs(ctx: Executor): Promise<void>
```

```typescript
convertToSquashfs(ctx: Executor): Promise<void>
```

```typescript
convertToZip(ctx: Executor): Promise<void>
```

```typescript
deleteChannel(ctx: Executor): Promise<void>
```

```typescript
deletePackage(ctx: Executor): Promise<void>
```

```typescript
getPackage(ctx: Executor): Promise<Blob>
```

```typescript
getProfilingData(ctx: Executor): Promise<Blob>
```

```typescript
getScreenshot(ctx: Executor): Promise<Blob>
```

```typescript
inspectPackage(ctx: Executor, option: { content: Blob | NodeJS.ArrayBufferView; password: string; }): Promise<Record<string, string>>
```

```typescript
installChannel(ctx: Executor, option: { content: Blob | NodeJS.ArrayBufferView; useSquashfs?: Boolean; remoteDebug?: boolean; remoteDebugConnectEarly?: boolean; }): Promise<void>
```

```typescript
packageChannel(ctx: Executor, option: { name: string; password: string; timestamp?: number; }): Promise<void>
```

```typescript
rekey(ctx: Executor, option: { content: Blob | NodeJS.ArrayBufferView; password: string; }): Promise<void>
```
