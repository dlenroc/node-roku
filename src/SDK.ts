import { DebugServer } from './DebugServer';
import { DeveloperServer } from './DeveloperServer';
import { Document } from './Document';
import { ECP } from './ECP';
import { ODC } from './ODC';

export class SDK {
  debugServer: DebugServer;
  developerServer: DeveloperServer;
  document: Document;
  ecp: ECP;
  odc: ODC;

  constructor(ip: string, username: string, password: string) {
    this.debugServer = new DebugServer(ip);
    this.developerServer = new DeveloperServer(ip, username, password);
    this.document = new Document(this);
    this.ecp = new ECP(ip);
    this.odc = new ODC(ip);
  }
}
