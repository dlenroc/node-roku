import type { AppId } from './AppId.js';

export interface AppObjectCounts {
  'channel-id': AppId;
  'channel-title': string;
  'channel-version': string;
  objects: { name: string; count: number }[];
}
