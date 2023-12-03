import * as odc from '@dlenroc/roku-odc';
import type { OmitFirstArg } from './OmitFirstArg.ts';

export class ODC {
  #executor: odc.ODCExecutor;

  constructor(...args: ConstructorParameters<typeof odc.ODCExecutor>) {
    this.#executor = new odc.ODCExecutor(...args);
  }

  clearRegistry: OmitFirstArg<(typeof odc)['clearRegistry']> = function (
    this: ODC,
    ...args
  ) {
    return odc.clearRegistry(this.#executor, ...args);
  };

  extend: (typeof odc)['extend'] = function (this: ODC, ...args) {
    return odc.extend(...args);
  };

  getAppUI: OmitFirstArg<(typeof odc)['getAppUI']> = function (
    this: ODC,
    ...args
  ) {
    return odc.getAppUI(this.#executor, ...args);
  };

  getFiles: OmitFirstArg<(typeof odc)['getFiles']> = function (
    this: ODC,
    ...args
  ) {
    return odc.getFiles(this.#executor, ...args);
  };

  getRegistry: OmitFirstArg<(typeof odc)['getRegistry']> = function (
    this: ODC,
    ...args
  ) {
    return odc.getRegistry(this.#executor, ...args);
  };

  patchRegistry: OmitFirstArg<(typeof odc)['patchRegistry']> = function (
    this: ODC,
    ...args
  ) {
    return odc.patchRegistry(this.#executor, ...args);
  };

  pullFile: OmitFirstArg<(typeof odc)['pullFile']> = function (
    this: ODC,
    ...args
  ) {
    return odc.pullFile(this.#executor, ...args);
  };

  pushFile: OmitFirstArg<(typeof odc)['pushFile']> = function (
    this: ODC,
    ...args
  ) {
    return odc.pushFile(this.#executor, ...args);
  };
}
