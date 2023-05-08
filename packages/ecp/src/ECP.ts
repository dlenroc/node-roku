import { URLSearchParams } from 'url';
import { ECPError } from './ECPError';
import type { ECPOptions } from './ECPOptions';
import fetch from './internal/keep-alive-fetch';
import parse from './internal/xml';
import { ActiveApp, App, AppId, ChannelPerformance, DeviceInfo, FWBeacons, FWBeaconsStatus, Failure, GraphicsFrameRate, Key, MediaInfo, Params, R2D2Bitmaps, Registry, SGRendezvousStatus } from './types';

export class ECP {
  private readonly config: ECPOptions;

  constructor(ip: string)
  constructor(options: ECPOptions)
  constructor(ipOrOptions: string | ECPOptions) {
    this.config = typeof ipOrOptions === 'string'
      ? { address: `http://${ipOrOptions}:8060` }
      : ipOrOptions;
  }

  async queryAppUI(): Promise<string> {
    return this.ecp('GET', `query/app-ui`);
  }

  async queryIcon(appId: AppId): Promise<Buffer> {
    return this.ecp('GET', `query/icon/${appId}`);
  }

  async queryApps(): Promise<App[]> {
    const response = await this.ecp<string>('GET', `query/apps`);
    return parse(response, { textNodeName: 'name', array: true });
  }

  async queryActiveApp(): Promise<ActiveApp> {
    const response = await this.ecp<string>('GET', `query/active-app`);
    return parse(response, { textNodeName: 'name' });
  }

  async queryMediaPlayer(): Promise<MediaInfo> {
    const response = await this.ecp<string>('GET', `query/media-player`);
    return parse(response);
  }

  async queryDeviceInfo(): Promise<DeviceInfo> {
    const response = await this.ecp<string>('GET', `query/device-info`);
    return parse(response);
  }

  async queryRegistry(appId: AppId, options?: Params): Promise<Failure | Registry> {
    const response = await this.ecp<string>('GET', `query/registry/${appId}`, options);
    return parse(response);
  }

  async queryGraphicsFrameRate(): Promise<GraphicsFrameRate> {
    const response = await this.ecp<string>('GET', `query/graphics-frame-rate`);
    return parse(response);
  }

  async queryChannelPerformance(appId: AppId, options?: Params): Promise<Failure | ChannelPerformance> {
    const response = await this.ecp<string>('GET', `query/chanperf/${appId}`, options);
    return parse(response);
  }

  async queryR2D2Bitmaps(appId: AppId): Promise<Failure | R2D2Bitmaps> {
    const response = await this.ecp<string>('GET', `query/r2d2-bitmaps/${appId}`);
    return parse(response);
  }

  async querySGNodesAll(appId: AppId): Promise<string> {
    return this.ecp('GET', `query/sgnodes/all/${appId}`);
  }

  async querySGNodesRoots(appId: AppId): Promise<string> {
    return this.ecp('GET', `query/sgnodes/roots/${appId}`);
  }

  async querySGNodesNodes(appId: AppId, nodeId: number): Promise<string> {
    return this.ecp('GET', `query/sgnodes/nodes/${appId}?node-id=${nodeId}`);
  }

  async querySGRendezvous(): Promise<string> {
    const response = await this.ecp<string>('GET', `query/sgrendezvous`);
    return parse(response);
  }

  async trackSGRendezvous(appId: AppId): Promise<Failure | SGRendezvousStatus> {
    const response = await this.ecp<string>('POST', `sgrendezvous/track${appId ? `/${appId}` : ''}`);
    return parse(response);
  }

  async untrackSGRendezvous(appId: AppId): Promise<Failure | SGRendezvousStatus> {
    const response = await this.ecp<string>('POST', `sgrendezvous/untrack${appId ? `/${appId}` : ''}`);
    return parse(response);
  }

  async queryFWBeacons(): Promise<FWBeacons> {
    const response = await this.ecp<string>('GET', `query/fwbeacons`);
    return parse(response);
  }

  async trackFWBeacons(appId: AppId): Promise<Failure | FWBeaconsStatus> {
    const response = await this.ecp<string>('POST', `fwbeacons/track${appId ? `/${appId}` : ''}`);
    return parse(response);
  }

  async untrackFWBeacons(appId: AppId): Promise<Failure | FWBeaconsStatus> {
    const response = await this.ecp<string>('POST', `fwbeacons/untrack`);
    return parse(response);
  }

  async input(options: Params): Promise<void> {
    await this.ecp('POST', `input`, options);
  }

  async search(options: Params): Promise<void> {
    await this.ecp('POST', `search/browse`, options);
  }

  async keydown(key: Key): Promise<void> {
    await this.ecp('POST', `keydown/${ECP.key(key)}`);
  }

  async keyup(key: Key): Promise<void> {
    await this.ecp('POST', `keyup/${ECP.key(key)}`);
  }

  async keypress(key: Key): Promise<void> {
    await this.ecp('POST', `keypress/${ECP.key(key)}`);
  }

  async type(text: string): Promise<void> {
    for (const char of text) {
      await this.keypress(char as Key);
    }
  }

  async launch(appId: AppId, options?: Params): Promise<void> {
    await this.ecp('POST', `launch/${appId}`, options);
  }

  async install(appId: AppId, options?: Params): Promise<void> {
    await this.ecp('POST', `install/${appId}`, options);
  }

  private async ecp<T extends string | Buffer | void>(method: string, path: string, params?: Record<string, any>): Promise<T> {
    if (params && Object.keys(params).length) {
      params = Object.entries(params).reduce((result: Record<string, any>, entry: string[]) => {
        result[entry[0]] = ['string', 'number', 'boolean'].includes(typeof entry[1]) ? entry[1] : JSON.stringify(entry[1]);
        return result;
      }, {});

      path += '?' + new URLSearchParams(params);
    }

    const response = await fetch(this.config.address + '/' + path, { method, signal: this.config.signal });

    if (!response.ok) {
      throw new ECPError(`${method} /${path} -> ${response.status} ${response.statusText}`);
    }

    if (response.headers.get('Content-Length') === '0') {
      return undefined as T;
    }

    if (response.headers.get('Content-Type')?.startsWith('text/')) {
      return response.text() as Promise<T>;
    }

    return response.buffer() as Promise<T>;
  }

  private static key(key: string): string {
    if (!key) {
      throw new ECPError('key is required');
    }

    if (key.length === 1) {
      key = `LIT_${encodeURIComponent(key)}`;
    }

    return key;
  }
}
