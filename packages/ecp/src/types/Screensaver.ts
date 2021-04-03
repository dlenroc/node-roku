import { AppId } from './AppId';

export interface Screensaver {
  id: AppId;
  type: string;
  version: string;
  screensaver: string;
}
