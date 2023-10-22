import type { AppId } from './AppId.ts';

export interface Screensaver {
  id: AppId;
  type: string;
  version: string;
  screensaver: string;
}
