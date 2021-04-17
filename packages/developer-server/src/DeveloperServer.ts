import FormData from 'form-data';
import * as indigestion from 'indigestion';
import fetch from 'node-fetch';
import { DeveloperServerError } from './DeveloperServerError';

export class DeveloperServer {
  private readonly username: string;
  private readonly password: string;
  private readonly baseUrl: string;
  private _authentication: any;

  constructor(ip: string, username: string, password: string) {
    this.username = username;
    this.password = password;
    this.baseUrl = `http://${ip}`;
  }

  async install(app: Buffer): Promise<void> {
    await this._request('POST', 'plugin_install', {
      mysubmit: 'Replace',
      archive: app,
    });
  }

  async delete(): Promise<void> {
    await this._request('POST', 'plugin_install', {
      mysubmit: 'Delete',
      archive: '',
    });
  }

  async convertToCramFs(): Promise<void> {
    await this._request('POST', 'plugin_install', {
      mysubmit: 'Convert to cramfs',
      archive: '',
    });
  }

  async convertToSquashFs(): Promise<void> {
    await this._request('POST', 'plugin_install', {
      mysubmit: 'Convert to squashfs',
      archive: '',
    });
  }

  async package(name: string, password: string): Promise<void> {
    const timestamp = new Date().getTime().toString();

    await this._request('POST', 'plugin_package', {
      mysubmit: 'Package',
      pkg_time: timestamp,
      app_name: name,
      passwd: password,
    });
  }

  async deletePackage(): Promise<void> {
    await this._request('POST', 'plugin_package', {
      mysubmit: 'Delete',
      pkg_time: '',
      app_name: '',
      passwd: '',
    });
  }

  async getPackage(): Promise<Buffer> {
    const response = (await this._request('GET', 'plugin_package')) as string;
    const pkg = response.match(/pkgs\/*\w+.pkg/)?.[0];

    if (!pkg) {
      throw new DeveloperServerError('Could not found packaged app');
    }

    return await this._request('GET', pkg);
  }

  async rekey(pkg: Buffer, password: string): Promise<void> {
    await this._request('POST', 'plugin_inspect', {
      mysubmit: 'Rekey',
      passwd: password,
      archive: pkg,
    });
  }

  async getScreenshot(): Promise<Buffer> {
    const response = await this._request<string>('POST', 'plugin_inspect', {
      mysubmit: 'Screenshot',
    });
    const imageUrl = response.match(/pkgs\/dev\.(png|jpg)/)?.[0];

    if (!imageUrl) {
      throw new DeveloperServerError('make sure that device is enabled and sideloaded app is launched');
    }

    return await this._request('GET', imageUrl);
  }

  async getProfilingData(): Promise<Buffer> {
    const response = await this._request<string>('POST', 'plugin_inspect', {
      mysubmit: 'dloadProf',
    });

    if (!response.includes('pkgs/channel.bsprof')) {
      throw new DeveloperServerError('no profiling data found on device');
    }

    return await this._request('GET', 'pkgs/channel.bsprof');
  }

  private async _request<T extends string | Buffer | void>(method: string, path: string, params?: Record<string, any>): Promise<T> {
    const headers = {
      Authorization: await this._getAuthorizationFor(method, path),
    };

    let body;
    if (params) {
      body = new FormData();
      for (const [key, value] of Object.entries(params)) {
        body.append(key, value);
      }
    }

    const response = await fetch(this.baseUrl + '/' + path, { method, headers, body });

    if (!response.ok) {
      const text = await response.text();
      const error = text.match(/'error'\).trigger\(\s*'.*?'\s*,\s*'(.+?)'\s*\)/)?.[1]
        || `${method} /${path} -> ${response.status} ${response.statusText}`;

      throw new DeveloperServerError(error);
    }

    if (response.headers.get('Content-Length') === '0') {
      return undefined as T;
    }

    if (response.headers.get('Content-Type')?.startsWith('text/')) {
      const text = await response.text();

      // roku-server can show an error without an appropriate status code
      const error = text.match(/'error'\).trigger\(\s*'.*?'\s*,\s*'(.+?)'\s*\)/)?.[1];
      if (error) {
        throw new DeveloperServerError(error);
      }

      return text as T;
    }

    return response.buffer() as Promise<T>;
  }

  private async _getAuthorizationFor(method: string, path: string): Promise<string> {
    if (!this._authentication) {
      this._authentication = fetch(this.baseUrl).then((response) => response.headers.get('WWW-Authenticate'));
    }

    const authenticateHeader = await this._authentication;

    return indigestion.generateDigestAuth({
      method,
      authenticateHeader,
      uri: path,
      username: this.username,
      password: this.password,
    });
  }
}
