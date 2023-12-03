import * as debugServer from '@dlenroc/roku-debug-server';
import type { OmitFirstArg } from './OmitFirstArg.ts';

export class DebugServer {
  #executor: debugServer.DebugServerExecutor;

  constructor(
    ...args: ConstructorParameters<typeof debugServer.DebugServerExecutor>
  ) {
    this.#executor = new debugServer.DebugServerExecutor(...args);
  }

  clearLaunchCaches: OmitFirstArg<(typeof debugServer)['clearLaunchCaches']> =
    function (this: DebugServer, ...args) {
      return debugServer.clearLaunchCaches(this.#executor, ...args);
    };

  clearSceneGraphPerformanceMetrics: OmitFirstArg<
    (typeof debugServer)['clearSceneGraphPerformanceMetrics']
  > = function (this: DebugServer, ...args) {
    return debugServer.clearSceneGraphPerformanceMetrics(
      this.#executor,
      ...args
    );
  };

  createDeveloperKey: OmitFirstArg<(typeof debugServer)['createDeveloperKey']> =
    function (this: DebugServer, ...args) {
      return debugServer.createDeveloperKey(this.#executor, ...args);
    };

  disableRendezvousLogging: OmitFirstArg<
    (typeof debugServer)['disableRendezvousLogging']
  > = function (this: DebugServer, ...args) {
    return debugServer.disableRendezvousLogging(this.#executor, ...args);
  };

  enableRendezvousLogging: OmitFirstArg<
    (typeof debugServer)['enableRendezvousLogging']
  > = function (this: DebugServer, ...args) {
    return debugServer.enableRendezvousLogging(this.#executor, ...args);
  };

  getChannelPerformanceStats: OmitFirstArg<
    (typeof debugServer)['getChannelPerformanceStats']
  > = function (this: DebugServer, ...args) {
    return debugServer.getChannelPerformanceStats(this.#executor, ...args);
  };

  getDeveloperKey: OmitFirstArg<(typeof debugServer)['getDeveloperKey']> =
    function (this: DebugServer, ...args) {
      return debugServer.getDeveloperKey(this.#executor, ...args);
    };

  getLoadedTextures: OmitFirstArg<(typeof debugServer)['getLoadedTextures']> =
    function (this: DebugServer, ...args) {
      return debugServer.getLoadedTextures(this.#executor, ...args);
    };

  getMaxWarningCount: OmitFirstArg<(typeof debugServer)['getMaxWarningCount']> =
    function (this: DebugServer, ...args) {
      return debugServer.getMaxWarningCount(this.#executor, ...args);
    };

  getMemoryStats: OmitFirstArg<(typeof debugServer)['getMemoryStats']> =
    function (this: DebugServer, ...args) {
      return debugServer.getMemoryStats(this.#executor, ...args);
    };

  getPlugins: OmitFirstArg<(typeof debugServer)['getPlugins']> = function (
    this: DebugServer,
    ...args
  ) {
    return debugServer.getPlugins(this.#executor, ...args);
  };

  getProfilingStatus: OmitFirstArg<(typeof debugServer)['getProfilingStatus']> =
    function (this: DebugServer, ...args) {
      return debugServer.getProfilingStatus(this.#executor, ...args);
    };

  getR2D2Bitmaps: OmitFirstArg<(typeof debugServer)['getR2D2Bitmaps']> =
    function (this: DebugServer, ...args) {
      return debugServer.getR2D2Bitmaps(this.#executor, ...args);
    };

  getRendezvousLoggingStatus: OmitFirstArg<
    (typeof debugServer)['getRendezvousLoggingStatus']
  > = function (this: DebugServer, ...args) {
    return debugServer.getRendezvousLoggingStatus(this.#executor, ...args);
  };

  getSceneGraphNodes: OmitFirstArg<(typeof debugServer)['getSceneGraphNodes']> =
    function (this: DebugServer, ...args) {
      return debugServer.getSceneGraphNodes(this.#executor, ...args);
    };

  getSceneGraphPerformanceMetrics: OmitFirstArg<
    (typeof debugServer)['getSceneGraphPerformanceMetrics']
  > = function (this: DebugServer, ...args) {
    return debugServer.getSceneGraphPerformanceMetrics(this.#executor, ...args);
  };

  hideFPS: OmitFirstArg<(typeof debugServer)['hideFPS']> = function (
    this: DebugServer,
    ...args
  ) {
    return debugServer.hideFPS(this.#executor, ...args);
  };

  pauseProfiling: OmitFirstArg<(typeof debugServer)['pauseProfiling']> =
    function (this: DebugServer, ...args) {
      return debugServer.pauseProfiling(this.#executor, ...args);
    };

  press: OmitFirstArg<(typeof debugServer)['press']> = function (
    this: DebugServer,
    ...args
  ) {
    return debugServer.press(this.#executor, ...args);
  };

  removePlugin: OmitFirstArg<(typeof debugServer)['removePlugin']> = function (
    this: DebugServer,
    ...args
  ) {
    return debugServer.removePlugin(this.#executor, ...args);
  };

  resumeProfiling: OmitFirstArg<(typeof debugServer)['resumeProfiling']> =
    function (this: DebugServer, ...args) {
      return debugServer.resumeProfiling(this.#executor, ...args);
    };

  scheduleChannelPerformanceLogging: OmitFirstArg<
    (typeof debugServer)['scheduleChannelPerformanceLogging']
  > = function (this: DebugServer, ...args) {
    return debugServer.scheduleChannelPerformanceLogging(
      this.#executor,
      ...args
    );
  };

  setMaxWarningCount: OmitFirstArg<(typeof debugServer)['setMaxWarningCount']> =
    function (this: DebugServer, ...args) {
      return debugServer.setMaxWarningCount(this.#executor, ...args);
    };

  showFPS: OmitFirstArg<(typeof debugServer)['showFPS']> = function (
    this: DebugServer,
    ...args
  ) {
    return debugServer.showFPS(this.#executor, ...args);
  };

  startSceneGraphPerformanceTracking: OmitFirstArg<
    (typeof debugServer)['startSceneGraphPerformanceTracking']
  > = function (this: DebugServer, ...args) {
    return debugServer.startSceneGraphPerformanceTracking(
      this.#executor,
      ...args
    );
  };

  stopSceneGraphPerformanceTracking: OmitFirstArg<
    (typeof debugServer)['stopSceneGraphPerformanceTracking']
  > = function (this: DebugServer, ...args) {
    return debugServer.stopSceneGraphPerformanceTracking(
      this.#executor,
      ...args
    );
  };

  toggleFPS: OmitFirstArg<(typeof debugServer)['toggleFPS']> = function (
    this: DebugServer,
    ...args
  ) {
    return debugServer.toggleFPS(this.#executor, ...args);
  };

  type: OmitFirstArg<(typeof debugServer)['type']> = function (
    this: DebugServer,
    ...args
  ) {
    return debugServer.type(this.#executor, ...args);
  };
}
