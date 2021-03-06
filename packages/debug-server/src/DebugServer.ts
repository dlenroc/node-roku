import { createConnection } from 'net';
import { DebugServerError } from './DebugServerError';
import { DeveloperKey, Memory, Textures } from './types';

export class DebugServer {
  private readonly ip: string;
  private readonly port = 8080;

  constructor(ip: string) {
    this.ip = ip;
  }

  // TODO: bsprof-status

  async enableProfiling(enable: boolean = true): Promise<boolean> {
    const state = enable ? 'resume' : 'pause';
    const result = await this._exec(`bsprof-${state}`);

    return result.includes(state);
  }

  async clearLaunchCache(): Promise<boolean> {
    const result = await this._exec('clear_launch_caches');
    return result.includes('Done.');
  }

  async enableFPS(enable: boolean = true): Promise<void> {
    await this._exec(`fps_display ${enable ? 1 : 0}`);
  }

  async getMemory(): Promise<Memory> {
    const result = await this._exec('free');
    const mem = result.match(/Mem:\s*(.+)/)?.[1]?.split(/\s+/);
    const swap = result.match(/Swap:\s*(.+)/)?.[1]?.split(/\s+/);

    if (!mem || !swap) {
      throw new DebugServerError('');
    }

    return {
      swap: {
        total: +swap[0],
        used: +swap[1],
        free: +swap[2],
      },
      mem: {
        total: +mem[0],
        used: +mem[1],
        free: +mem[2],
        shared: +mem[3],
        cache: +mem[4],
        available: +mem[5],
      },
    };
  }

  async generateDeveloperKey(): Promise<DeveloperKey> {
    const result = await this._exec('genkey');
    const devIdMatches = result.match(/DevID: (.+)/);
    const passwordMatches = result.match(/Password: (.+)/);
    if (!devIdMatches || !passwordMatches) {
      throw new DebugServerError(result);
    }

    return { id: devIdMatches[1], password: passwordMatches[1] };
  }

  async getLoadedTextures(): Promise<Textures> {
    let result = await this._exec('loaded_textures');
    result += '\n';

    const textureMemoryMatches = result.match(/Texture Memory: (\d+)KB of (\d+)KB used/) || [0, 0, 0];
    const used = +textureMemoryMatches[1];
    const total = +textureMemoryMatches[2];

    const systemTextures = [];
    const systemTexturesMatches = result.match(/\*\s+System textures\s+\*\s*\n[\s\S]+?\n\n/)?.[0]?.matchAll(/(\d+)\s+x\s+(\d+)\s+(\d+)\s+(.+)/g);
    if (systemTexturesMatches) {
      for (const groups of systemTexturesMatches) {
        systemTextures.push({
          width: +groups[1],
          height: +groups[2],
          size: +groups[3],
          url: groups[4],
        });
      }
    }

    const downloadTextures = [];
    const downloadedTexturesMatches = result.match(/\*\s+Downloaded textures\s+\*\s*\n[\s\S]+?\n\n/)?.[0]?.matchAll(/(\d+)\s+x\s+(\d+)\s+(\d+)\s+(.+)/g);
    if (downloadedTexturesMatches) {
      for (const groups of downloadedTexturesMatches) {
        downloadTextures.push({
          width: +groups[1],
          height: +groups[2],
          size: +groups[3],
          url: groups[4],
        });
      }
    }

    const channelTextures = [];
    const channelTexturesMatches = result.match(/\*\s+Channel textures\s+\*\s*\n[\s\S]+?\n\n/)?.[0]?.matchAll(/(\d+)\s+x\s+(\d+)\s+(\d+)\s+(.+)/g);
    if (channelTexturesMatches) {
      for (const groups of channelTexturesMatches) {
        channelTextures.push({
          width: +groups[1],
          height: +groups[2],
          size: +groups[3],
          url: groups[4],
        });
      }
    }

    return {
      used,
      total,
      system: systemTextures,
      downloaded: downloadTextures,
      channel: channelTextures,
    };
  }

  async enableRendezvousLogging(enable: boolean = true): Promise<boolean> {
    const state = enable ? 'on' : 'off';
    const response = await this._exec(`logrendezvous ${state}`);

    return response.includes(`rendezvous logging is ${state}`);
  }

  // TODO: plugins

  async press(keys: string): Promise<void> {
    await this._exec(`press ${keys}`);
  }

  // TODO: r2d2_bitmaps

  async getSGNodes(node: string): Promise<string> {
    return await this._exec(`sgnodes ${node}`);
  }

  // TODO: sgperf

  async getDeveloperId(): Promise<string> {
    const result = await this._exec('showkey');
    const matches = result.match(/Dev ID: (.+)/);
    if (!matches) {
      throw new DebugServerError(result);
    }

    return matches[1];
  }

  async type(string: string): Promise<void> {
    await this._exec(`type ${string}`);
  }

  private async _exec(cmd: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const client = createConnection(this.port, this.ip, () => {
        client.write(`${cmd}\nq\n`);
      });

      client.setTimeout(5e3, () => {
        client.destroy(new DebugServerError(
          `Inactivity timeout exceeded during execution of '${cmd}' command, ` +
          `make sure the device is available on the network and ` +
          `there is no other active telnet connection with '${this.ip}:${this.port}'`
        ));
      });

      let chunks: Buffer[] = [];
      client.on('data', (chunk) => {
        chunks.push(chunk);
      });

      client.on('end', () => {
        const response = Buffer.concat(chunks).toString().replace(/\r/g, '');
        resolve(response.slice(response.indexOf('\n>') + 2, response.lastIndexOf('\n>')));
      });

      client.on('error', (error) => {
        reject(error);
      });

      client.on('close', () => {
        client.destroy();
        client.removeAllListeners();
      });
    });
  }
}
