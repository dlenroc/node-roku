import { URLSearchParams } from 'url';
import { ECPError } from './ECPError';
import fetch from './internal/keep-alive-fetch';
import parse from './internal/xml';
import { ActiveApp, App, AppId, DeviceInfo, Key, MediaInfo, Params } from './types';

export class ECP {
  private readonly baseUrl: string;

  constructor(ip: string) {
    this.baseUrl = `http://${ip}:8060`;
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
    if (params) {
      path += '?' + new URLSearchParams(params);
    }

    const response = await fetch(this.baseUrl + '/' + path, { method });

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
