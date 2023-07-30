# @dlenroc/roku-debug-server · [![NPM Version](https://img.shields.io/npm/v/@dlenroc/roku-debug-server)](https://www.npmjs.com/package/@dlenroc/roku-debug-server)

Client for [host utilities](https://developer.roku.com/en-gb/docs/developer-program/debugging/debugging-channels.md#scenegraph-debug-server-port-8080-commands) provided via telnet on port `8080`

## Installation

```sh
npm install @dlenroc/roku-debug-server
```

## Usage

```typescript
import { TelnetExecutor, getPlugins } from '@dlenroc/roku-debug-server';

const ctx = new TelnetExecutor({
  hostname: '<ip>',
  port: '8080'
});

// raw
const rawPlugins = await ctx.execute('plugins');
console.log(rawPlugins);

// typed
const plugins = await getPlugins(ctx);
console.log(plugins);
```

---

```typescript
clearLaunchCaches(ctx: Executor): Promise<void>
```

```typescript
clearSceneGraphPerformanceData(executor: Executor): Promise<void>
```

```typescript
clearSceneGraphPerformanceData(executor: Executor): Promise<void>
```

```typescript
createDeveloperKey(executor: Executor): Promise<DeveloperKey>
```

```typescript
disableRendezvousLogging(executor: Executor): Promise<void>
```

```typescript
enableRendezvousLogging(executor: Executor): Promise<void>
```

```typescript
getChannelPerformanceData(executor: Executor): Promise<ChannelStats>
```

```typescript
getDeveloperKey(executor: Executor): Promise<string>
```

```typescript
getLoadedTextures(executor: Executor, overlay?: string): Promise<LoadedTextures>
```

```typescript
getMaxWarningCount(executor: Executor): Promise<number>
```

```typescript
getMemoryStats(executor: Executor): Promise<MemoryStats>
```

```typescript
getPlugins(executor: Executor, idOrName?: number | string): Promise<{ plugins: Plugin[] }>
```

```typescript
getProfilingStatus(executor: Executor): Promise<ProfilingStatus>
```

```typescript
getR2D2Bitmaps(executor: Executor): Promise<R2D2Bitmap[]>
```

```typescript
getRendezvousLoggingStatus(executor: Executor): Promise<RendezvousLoggingStatus>
```

```typescript
getSceneGraphNodes(executor: Executor, node: string): Promise<string>
```

```typescript
getSceneGraphPerformanceData(executor: Executor): Promise<SceneGraphPerformance[]>
```

```typescript
hideFPS(executor: Executor): Promise<void>
```

```typescript
pauseProfiling(executor: Executor): Promise<void>
```

```typescript
press(executor: Executor, keys: string): Promise<void>
```

```typescript
removePlugin(executor: Executor, id: number | 'dev'): Promise<void>
```

```typescript
resumeProfiling(executor: Executor): Promise<void>
```

```typescript
scheduleChannelStats(executor: Executor, intervalInSeconds: number): Promise<number>
```

```typescript
setMaxWarningCount(executor: Executor, count: number): Promise<number>
```

```typescript
showFPS(executor: Executor): Promise<void>
```

```typescript
startSceneGraphPerformanceTracking(executor: Executor): Promise<void>
```

```typescript
stopSceneGraphPerformanceTracking(executor: Executor): Promise<void>
```

```typescript
toggleFPS(executor: Executor): Promise<void>
```

```typescript
type(executor: Executor, text: string): Promise<void>
```
