import { DebugServer } from '@dlenroc/roku-debug-server';
import { DeveloperServer } from '@dlenroc/roku-developer-server';
import { Document } from '@dlenroc/roku-dom';
import { ECP } from '@dlenroc/roku-ecp';
import { ODC } from '@dlenroc/roku-odc';

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
