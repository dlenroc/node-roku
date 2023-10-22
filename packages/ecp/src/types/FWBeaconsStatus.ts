import type { Success } from './Success.ts';

export interface FWBeaconsStatus extends Success {
  'tracking-enabled': boolean;
}
