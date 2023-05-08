# @dlenroc/roku-debug-server · [![NPM Version](https://img.shields.io/npm/v/@dlenroc/roku-debug-server)](https://www.npmjs.com/package/@dlenroc/roku-debug-server)

Client for [host utilities](https://developer.roku.com/en-gb/docs/developer-program/debugging/debugging-channels.md#scenegraph-debug-server-port-8080-commands) provided via telnet on port `8080`

## Installation

```sh
npm install @dlenroc/roku-debug-server
```

## Usage

```typescript
import DebugServer from '@dlenroc/roku-debug-server';

// const debugServer = new DebugServer('<ip>');
const debugServer = new DebugServer({ address: 'tcp://<ip>:8080' });

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
