[![Node.js CI](https://github.com/dlenroc/node-roku/workflows/Node.js%20CI/badge.svg)](https://github.com/dlenroc/node-roku/actions?query=workflow%3A"Node.js+CI")
[![Supported Node.js version](https://img.shields.io/node/v/@dlenroc/roku)](https://github.com/dlenroc/node-roku/actions?query=workflow%3A"Node.js+CI")
[![NPM Version](https://img.shields.io/npm/v/@dlenroc/roku?cacheSeconds=86400)](https://www.npmjs.com/package/@dlenroc/roku)

# Roku SDK

- [Setup](#setup)
- [Components](#components)
  - [ECP](#ecp)
  - [DebugServer](#debugserver)
  - [DeveloperServer](#developerserver)
  - [ODC](#odc)
  - [DOM](#dom)
    - [Document](#document)
    - [Element](#element)

## Setup

```sh
npm install @dlenroc/roku
```

## Components

### ECP

Client for [external control protocol](https://developer.roku.com/en-gb/docs/developer-program/debugging/external-control-api.md#external-control-service-commands) provided on port `8060`

```typescript
import SDK, { ECP } from '@dlenroc/roku';

// SDK
const sdk = new SDK('<ip>', '<username>', '<password>');
await sdk.ecp.queryAppUI();

// ECP
const ecp = new ECP('<ip>');
await ecp.queryAppUI();
```

---

```typescript
queryAppUI(): Promise<string>
```

```typescript
queryIcon(appId: AppId): Promise<Buffer>
```

```typescript
queryApps(): Promise<App[]>
```

```typescript
queryActiveApp(): Promise<ActiveApp>
```

```typescript
queryMediaPlayer(): Promise<MediaInfo>
```

```typescript
queryDeviceInfo(): Promise<DeviceInfo>
```

```typescript
input(options: Params): Promise<void>
```

```typescript
search(options: Params): Promise<void>
```

```typescript
keydown(key: Key): Promise<void>
```

```typescript
keyup(key: Key): Promise<void>
```

```typescript
keypress(key: Key): Promise<void>
```

```typescript
type(keys: string): Promise<void>
```

```typescript
launch(appId: AppId, options?: Params): Promise<void>
```

```typescript
install(appId: AppId, options?: Params): Promise<void>
```

### DebugServer

Client for [host utilities](https://developer.roku.com/en-gb/docs/developer-program/debugging/debugging-channels.md#scenegraph-debug-server-port-8080-commands) provided via telnet on port `8080`

```typescript
import SDK, { DebugServer } from '@dlenroc/roku';

// SDK
const sdk = new SDK('<ip>', '<username>', '<password>');
await sdk.debugServer.enableProfiling();

// DebugServer
const debugServer = new DebugServer('<ip>');
await debugServer.enableProfiling();
```

---

<!-- TODO: bsprof-status -->

```typescript
enableProfiling(enable: boolean): Promise<boolean>
```

```typescript
clearLaunchCache(): Promise<boolean>
```

```typescript
enableFPS(enable: boolean): Promise<void>
```

```typescript
getMemory(): Promise<Memory>
```

```typescript
generateDeveloperKey(): Promise<DeveloperKey>
```

```typescript
getLoadedTextures(): Promise<Textures>
```

```typescript
enableRendezvousLogging(enable: boolean): Promise<boolean>
```

<!-- TODO: plugins -->

```typescript
press(keys: string): Promise<void>
```

<!-- TODO: r2d2_bitmaps -->

```typescript
getSGNodes(node: string): Promise<string>
```

<!-- TODO: sgperf -->

```typescript
getDeveloperId(): Promise<String>
```

```typescript
type(string: string): Promise<void>
```

### DeveloperServer

Client for [host utilities](https://developer.roku.com/en-gb/docs/developer-program/getting-started/developer-setup.md) provided via a web page at `http://<ip>`

```typescript
import fs from 'fs';
import SDK, { DeveloperServer } from '@dlenroc/roku';

const app = fs.readFileSync('<path_to_channel>');

// SDK
const sdk = new SDK('<ip>', '<username>', '<password>');
await sdk.developerServer.install(app);

// DeveloperServer
const developerServer = new DeveloperServer('<ip>', '<username>', '<password>');
await developerServer.install(app);
```

---

```typescript
install(app: Buffer): Promise<void>
```

```typescript
delete(): Promise<void>
```

```typescript
convertToCramFs(): Promise<void>
```

```typescript
convertToSquashFs(): Promise<void>
```

```typescript
package(name: string, password: string): Promise<void>
```

```typescript
deletePackage(): Promise<void>
```

```typescript
getPackage(): Promise<Buffer>
```

```typescript
rekey(pkg: Buffer, password: string): Promise<void>
```

```typescript
getScreenshot(): Promise<Buffer>
```

```typescript
getProfilingData(): Promise<Buffer>
```

### ODC

Client for runtime utilities

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

### DOM

DOM-like representation of the app-ui

> ⚠️ `render()` must be called for synchronizing DOM with application state

```typescript
import fs from 'fs';
import SDK from '@dlenroc/roku';

const sdk = new SDK('<ip>', '<username>', '<password>');

// Sync DOM
await sdk.document.render();

const element = sdk.document.cssSelect('[text="Play"]');
console.log(element.isFocused);
```

#### Document

Everything from [Element](#element) ➕

```typescript
get context(): 'ECP' | 'ODC'
```

```typescript
set context(context: 'ECP' | 'ODC')
```

```typescript
get focusedElement(): Element
```

```typescript
get isKeyboardShown(): boolean
```

```typescript
render(): Promise<void>
```

#### Element

```typescript
get sdk(): SDK
```

```typescript
get document(): Document
```

```typescript
get parent(): Element | null
```

```typescript
get parents(): Element[]
```

```typescript
get siblings(): Element[]
```

```typescript
get prev(): Element | null
```

```typescript
get next(): Element | null
```

```typescript
get children(): Element[]
```

```typescript
get tag(): string
```

```typescript
get path(): string
```

```typescript
get index(): number
```

```typescript
get attributes(): Record<string, string>
```

```typescript
get text(): string
```

```typescript
get bounds(): Rect | null
```

```typescript
get isConnected(): boolean
```

```typescript
get isFocused(): boolean
```

```typescript
get isInFocusChain(): boolean
```

```typescript
get isDisplayed(): boolean
```

```typescript
isSameNode(element: Element): boolean
```

```typescript
clear(): Promise<void>
```

```typescript
type(text: string): Promise<void>
```

```typescript
append(text: string): Promise<void>
```

```typescript
select(): Promise<void>
```

```typescript
focus(): Promise<void>
```

```typescript
cssSelect(css: string): Element | null
```

```typescript
cssSelect(css: string, timeoutInSeconds: number): Promise<Element | null>
```

```typescript
cssSelectAll(css: string): Element[]
```

```typescript
cssSelectAll(css: string, timeoutInSeconds: number): Promise<Element[]>
```

```typescript
xpathSelect(xpath: string): Element | null
```

```typescript
xpathSelect(xpath: string, timeoutInSeconds: number): Promise<Element | null>
```

```typescript
xpathSelectAll(xpath: string): Element[]
```

```typescript
xpathSelectAll(xpath: string, timeoutInSeconds: number): Promise<Element[]>
```

```typescript
toString(): string
```
