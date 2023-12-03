import * as developerServer from '@dlenroc/roku-developer-server';
import type { OmitFirstArg } from './OmitFirstArg.ts';

export class DeveloperServer {
  #executor: developerServer.DeveloperServerExecutor;

  constructor(
    ...args: ConstructorParameters<
      typeof developerServer.DeveloperServerExecutor
    >
  ) {
    this.#executor = new developerServer.DeveloperServerExecutor(...args);
  }

  convertToSquashfs: OmitFirstArg<
    (typeof developerServer)['convertToSquashfs']
  > = function (this: DeveloperServer, ...args) {
    return developerServer.convertToSquashfs(this.#executor, ...args);
  };

  convertToZip: OmitFirstArg<(typeof developerServer)['convertToZip']> =
    function (this: DeveloperServer, ...args) {
      return developerServer.convertToZip(this.#executor, ...args);
    };

  deleteChannel: OmitFirstArg<(typeof developerServer)['deleteChannel']> =
    function (this: DeveloperServer, ...args) {
      return developerServer.deleteChannel(this.#executor, ...args);
    };

  deletePackage: OmitFirstArg<(typeof developerServer)['deletePackage']> =
    function (this: DeveloperServer, ...args) {
      return developerServer.deletePackage(this.#executor, ...args);
    };

  inspectPackage: OmitFirstArg<(typeof developerServer)['inspectPackage']> =
    function (this: DeveloperServer, ...args) {
      return developerServer.inspectPackage(this.#executor, ...args);
    };

  installChannel: OmitFirstArg<(typeof developerServer)['installChannel']> =
    function (this: DeveloperServer, ...args) {
      return developerServer.installChannel(this.#executor, ...args);
    };

  packageChannel: OmitFirstArg<(typeof developerServer)['packageChannel']> =
    function (this: DeveloperServer, ...args) {
      return developerServer.packageChannel(this.#executor, ...args);
    };

  rekey: OmitFirstArg<(typeof developerServer)['rekey']> = function (
    this: DeveloperServer,
    ...args
  ) {
    return developerServer.rekey(this.#executor, ...args);
  };

  saveProfilingData: OmitFirstArg<
    (typeof developerServer)['saveProfilingData']
  > = function (this: DeveloperServer, ...args) {
    return developerServer.saveProfilingData(this.#executor, ...args);
  };

  takeScreenshot: OmitFirstArg<(typeof developerServer)['takeScreenshot']> =
    function (this: DeveloperServer, ...args) {
      return developerServer.takeScreenshot(this.#executor, ...args);
    };
}
