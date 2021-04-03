# @dlenroc/roku-odc · [![NPM Version](https://img.shields.io/npm/v/@dlenroc/roku-odc)](https://www.npmjs.com/package/@dlenroc/roku-odc)

Client for runtime utilities

## Installation

```sh
npm install @dlenroc/roku-odc
```

## Usage

> ⚠️ `extend(app)` must be used to inject backend into your application

```typescript
import fs from 'fs';
import SDK, { DeveloperServer, ODC } from '@dlenroc/roku';

const app = fs.readFileSync('<path_to_channel>');

// SDK
const sdk = new SDK('<ip>', '<username>', '<password>');
const patchedApp = await sdk.odc.extend(app);
await sdk.developerServer.install(patchedApp);
await sdk.odc.getRegistry();

// ODC
const odc = new ODC('<ip>');
const developerServer = new DeveloperServer('<ip>', '<username>', '<password>');
const patchedApp = await odc.extend(app);
await developerServer.install(patchedApp);
await odc.getRegistry();
```

---

```typescript
extend(app: Buffer): Promise<Buffer>
```

```typescript
getAppUI(): Promise<string>
```

```typescript
getRegistry(): Promise<Record<string, Record<string, string>>>
```

```typescript
patchRegistry(changes: Record<string, null | Record<string, string | null>>): Promise<void>
```

```typescript
clearRegistry(): Promise<void>
```
