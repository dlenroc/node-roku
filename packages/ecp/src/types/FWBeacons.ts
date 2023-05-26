import type { FWBeaconsStatus } from './FWBeaconsStatus';

export interface FWBeacons extends FWBeaconsStatus {
  'plugin-id': string;
  'drop-count': number;
  'interval-drop-count': number;
  count: number;
  timestamp: number;
  'app-exit-initiate'?: {
    timestamp: number;
  };
  'app-exit-complete'?: {
    timestamp: number;
  };
  'app-splash-initiate'?: {
    timestamp: number;
  };
  'app-splash-complete'?: {
    timestamp: number;
  };
  'app-compile-complete'?: {
    timestamp: number;
  };
}
