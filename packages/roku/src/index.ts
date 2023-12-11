import {
  DebugServerExecutor,
  type Executor as SdkDebugServerExecutor,
} from '@dlenroc/roku-debug-server';
import {
  DeveloperServerExecutor,
  type Executor as SdkDeveloperServerExecutor,
} from '@dlenroc/roku-developer-server';
import {
  ECPExecutor,
  type Executor as SdkECPExecutor,
} from '@dlenroc/roku-ecp';
import {
  ODCExecutor,
  type Executor as SdkODCExecutor,
} from '@dlenroc/roku-odc';

type DirectConfig = {
  hostname: string;
  username: string;
  password: string;
  signal?: AbortSignal;
};

type ExecutorConfig = {
  debugServer?: SdkDebugServerExecutor;
  developerServer?: SdkDeveloperServerExecutor;
  ecp?: SdkECPExecutor;
  odc?: SdkODCExecutor;
};

export class SDK {
  public debugServer: SdkDebugServerExecutor;
  public developerServer: SdkDeveloperServerExecutor;
  public ecp: SdkECPExecutor;
  public odc: SdkODCExecutor;

  constructor(
    config:
      | DirectConfig
      | Required<ExecutorConfig>
      | (DirectConfig & ExecutorConfig)
  ) {
    this.debugServer =
      'debugServer' in config
        ? config.debugServer
        : new DebugServerExecutor({
            signal: config.signal!,
            hostname: config.hostname,
            port: 8080,
          });

    this.developerServer =
      'developerServer' in config
        ? config.developerServer
        : new DeveloperServerExecutor({
            address: `http://${config.hostname}`,
            signal: config.signal!,
            username: config.username,
            password: config.password,
          });

    this.ecp =
      'ecp' in config
        ? config.ecp
        : new ECPExecutor({
            address: `http://${config.hostname}:8060`,
            signal: config.signal!,
          });

    this.odc =
      'odc' in config
        ? config.odc
        : new ODCExecutor({
            address: `http://${config.hostname}:8061`,
            signal: config.signal!,
          });
  }
}
