import type { AppId } from './AppId.js';
import type { FWBeaconsStatus } from './FWBeaconsStatus.ts';

export interface FWBeacons extends FWBeaconsStatus {
  count?: number;
  timestamp: number;
  'drop-count'?: number;
  'interval-drop-count'?: number;
  'plugin-id'?: AppId;
  'app-exit-initiate'?: { timestamp: number }[];
  'app-exit-complete'?: { timestamp: number }[];
  'app-splash-initiate'?: { timestamp: number }[];
  'app-splash-complete'?: { timestamp: number }[];
  'app-compile-complete'?: { timestamp: number }[];
  'app-compile-initiate'?: { timestamp: number }[];
  'vod-start-initiate'?: { timestamp: number }[];
  'vod-start-complete'?: { timestamp: number }[];
  [key: `${string}-initiate`]: { timestamp: number }[];
  [key: `${string}-complete`]: { timestamp: number }[];
}
