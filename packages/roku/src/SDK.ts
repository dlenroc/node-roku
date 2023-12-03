import { DebugServer } from './DebugServer.js';
import { DeveloperServer } from './DeveloperServer.js';
import { ECP } from './ECP.js';
import { ODC } from './ODC.js';

export class SDK {
  debugServer: DebugServer;
  developerServer: DeveloperServer;
  ecp: ECP;
  odc: ODC;

  constructor(config: {
    hostname: string;
    username: string;
    password: string;
    signal?: AbortSignal;
  }) {
    this.debugServer = new DebugServer({
      signal: config.signal!,
      hostname: config.hostname,
      port: 8080,
    });

    this.developerServer = new DeveloperServer({
      address: `http://${config.hostname}`,
      signal: config.signal!,
      username: config.username,
      password: config.password,
    });

    this.ecp = new ECP({
      address: `http://${config.hostname}:8060`,
      signal: config.signal!,
    });

    this.odc = new ODC({
      address: `http://${config.hostname}:8061`,
      signal: config.signal!,
    });
  }
}
