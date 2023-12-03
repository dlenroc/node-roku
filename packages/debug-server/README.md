# @dlenroc/roku-debug-server · [![NPM Version](https://img.shields.io/npm/v/@dlenroc/roku-debug-server)](https://www.npmjs.com/package/@dlenroc/roku-debug-server)

Client for [host utilities](https://developer.roku.com/en-gb/docs/developer-program/debugging/debugging-channels.md#scenegraph-debug-server-port-8080-commands) provided via telnet on port `8080`

## Installation

```sh
npm install @dlenroc/roku-debug-server
```

## Usage

```typescript
import { DebugServerExecutor, getPlugins } from '@dlenroc/roku-debug-server';

const ctx = new DebugServerExecutor({
  hostname: '<ip>',
  port: 8080,
});

// typed
const plugins = await getPlugins(ctx);
console.log(plugins);

// raw
const rawResult = await ctx.execute('plugins');
console.log(rawResult);
```

---

| Method                                                                                                                                                        | Command                 | Description                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | --------------------------------------------------------- |
| `clearLaunchCaches`                                                                                                                                           | `clear_launch_caches`   | Clear all caches that can affect channel launch time      |
| `clearSceneGraphPerformanceMetrics` <br> `getSceneGraphPerformanceMetrics` <br> `startSceneGraphPerformanceTracking` <br> `stopSceneGraphPerformanceTracking` | `sgperf`                | SceneGraph node operation performance metrics             |
| `disableRendezvousLogging` <br> `enableRendezvousLogging` <br> `getRendezvousLoggingStatus`                                                                   | `logrendezvous`         | Turn Rendezvous Logging on or off                         |
| `generateDeveloperKey`                                                                                                                                        | `genkey`                | Generate a new developer key                              |
| `getChannelPerformanceStats` <br> `scheduleChannelPerformanceLogging`                                                                                         | `chanperf`              | Show channel CPU and memory usage                         |
| `getDeveloperKey`                                                                                                                                             | `showkey`               | Show the current developer key                            |
| `getLoadedTextures`                                                                                                                                           | `loaded_textures`       | Show loaded textures (default main RenderContext)         |
| `getMaxWarningCount` <br> `setMaxWarningCount`                                                                                                                | `brightscript_warnings` | Set the maximum number of brightscript warnings displayed |
| `getMemoryStats`                                                                                                                                              | `free`                  | Return the output of the free(1) command                  |
| `getPlugins`                                                                                                                                                  | `plugins`               | Show list of all installed plugins                        |
| `getProfilingStatus`                                                                                                                                          | `bsprof-status`         | Get BS profiling status                                   |
| `getR2D2Bitmaps`                                                                                                                                              | `r2d2_bitmaps`          | Enumerate R2D2 bitmaps                                    |
| `getSceneGraphNodes`                                                                                                                                          | `sgnodes`               | List Scene Graph nodes                                    |
| `hideFPS` <br> `showFPS` <br> `toggleFPS`                                                                                                                     | `fps_display`           | Display onscreen graphics statistics                      |
| `pauseProfiling`                                                                                                                                              | `bsprof-pause`          | Pause BS profiling                                        |
| `press`                                                                                                                                                       | `press`                 | Simulate a keypress                                       |
| `removePlugin`                                                                                                                                                | `remove_plugin`         | Remove a plugin from the account and device               |
| `resumeProfiling`                                                                                                                                             | `bsprof-resume`         | Resume BS profiling                                       |
| `type`                                                                                                                                                        | `type`                  | Send a literal text sequence                              |
