import * as ecp from '@dlenroc/roku-ecp';
import type { OmitFirstArg } from './OmitFirstArg.ts';

export class ECP {
  #executor: ecp.ECPExecutor;

  constructor(...args: ConstructorParameters<typeof ecp.ECPExecutor>) {
    this.#executor = new ecp.ECPExecutor(...args);
  }

  input: OmitFirstArg<(typeof ecp)['input']> = function (this: ECP, ...args) {
    return ecp.input(this.#executor, ...args);
  };

  keydown: OmitFirstArg<(typeof ecp)['keydown']> = function (
    this: ECP,
    ...args
  ) {
    return ecp.keydown(this.#executor, ...args);
  };

  keypress: OmitFirstArg<(typeof ecp)['keypress']> = function (
    this: ECP,
    ...args
  ) {
    return ecp.keypress(this.#executor, ...args);
  };

  keyup: OmitFirstArg<(typeof ecp)['keyup']> = function (this: ECP, ...args) {
    return ecp.keyup(this.#executor, ...args);
  };

  launch: OmitFirstArg<(typeof ecp)['launch']> = function (this: ECP, ...args) {
    return ecp.launch(this.#executor, ...args);
  };

  queryActiveApp: OmitFirstArg<(typeof ecp)['queryActiveApp']> = function (
    this: ECP,
    ...args
  ) {
    return ecp.queryActiveApp(this.#executor, ...args);
  };

  queryAppUI: OmitFirstArg<(typeof ecp)['queryAppUI']> = function (
    this: ECP,
    ...args
  ) {
    return ecp.queryAppUI(this.#executor, ...args);
  };

  queryApps: OmitFirstArg<(typeof ecp)['queryApps']> = function (
    this: ECP,
    ...args
  ) {
    return ecp.queryApps(this.#executor, ...args);
  };

  queryChannelPerformance: OmitFirstArg<
    (typeof ecp)['queryChannelPerformance']
  > = function (this: ECP, ...args) {
    return ecp.queryChannelPerformance(this.#executor, ...args);
  };

  queryDeviceInfo: OmitFirstArg<(typeof ecp)['queryDeviceInfo']> = function (
    this: ECP,
    ...args
  ) {
    return ecp.queryDeviceInfo(this.#executor, ...args);
  };

  queryFWBeacons: OmitFirstArg<(typeof ecp)['queryFWBeacons']> = function (
    this: ECP,
    ...args
  ) {
    return ecp.queryFWBeacons(this.#executor, ...args);
  };

  queryGraphicsFrameRate: OmitFirstArg<(typeof ecp)['queryGraphicsFrameRate']> =
    function (this: ECP, ...args) {
      return ecp.queryGraphicsFrameRate(this.#executor, ...args);
    };

  queryIcon: OmitFirstArg<(typeof ecp)['queryIcon']> = function (
    this: ECP,
    ...args
  ) {
    return ecp.queryIcon(this.#executor, ...args);
  };

  queryMediaPlayer: OmitFirstArg<(typeof ecp)['queryMediaPlayer']> = function (
    this: ECP,
    ...args
  ) {
    return ecp.queryMediaPlayer(this.#executor, ...args);
  };

  queryR2D2Bitmaps: OmitFirstArg<(typeof ecp)['queryR2D2Bitmaps']> = function (
    this: ECP,
    ...args
  ) {
    return ecp.queryR2D2Bitmaps(this.#executor, ...args);
  };

  queryRegistry: OmitFirstArg<(typeof ecp)['queryRegistry']> = function (
    this: ECP,
    ...args
  ) {
    return ecp.queryRegistry(this.#executor, ...args);
  };

  querySGNodesAll: OmitFirstArg<(typeof ecp)['querySGNodesAll']> = function (
    this: ECP,
    ...args
  ) {
    return ecp.querySGNodesAll(this.#executor, ...args);
  };

  querySGNodesNodes: OmitFirstArg<(typeof ecp)['querySGNodesNodes']> =
    function (this: ECP, ...args) {
      return ecp.querySGNodesNodes(this.#executor, ...args);
    };

  querySGNodesRoots: OmitFirstArg<(typeof ecp)['querySGNodesRoots']> =
    function (this: ECP, ...args) {
      return ecp.querySGNodesRoots(this.#executor, ...args);
    };

  querySGRendezvous: OmitFirstArg<(typeof ecp)['querySGRendezvous']> =
    function (this: ECP, ...args) {
      return ecp.querySGRendezvous(this.#executor, ...args);
    };

  search: OmitFirstArg<(typeof ecp)['search']> = function (this: ECP, ...args) {
    return ecp.search(this.#executor, ...args);
  };

  trackFWBeacons: OmitFirstArg<(typeof ecp)['trackFWBeacons']> = function (
    this: ECP,
    ...args
  ) {
    return ecp.trackFWBeacons(this.#executor, ...args);
  };

  trackSGRendezvous: OmitFirstArg<(typeof ecp)['trackSGRendezvous']> =
    function (this: ECP, ...args) {
      return ecp.trackSGRendezvous(this.#executor, ...args);
    };

  untrackFWBeacons: OmitFirstArg<(typeof ecp)['untrackFWBeacons']> = function (
    this: ECP,
    ...args
  ) {
    return ecp.untrackFWBeacons(this.#executor, ...args);
  };

  untrackSGRendezvous: OmitFirstArg<(typeof ecp)['untrackSGRendezvous']> =
    function (this: ECP, ...args) {
      return ecp.untrackSGRendezvous(this.#executor, ...args);
    };
}
