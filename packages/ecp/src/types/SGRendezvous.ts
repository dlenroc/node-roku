import type { AppId } from './AppId.ts';
import type { Success } from './Success.ts';

export interface SGRendezvous extends Success {
  data: {
    'tracking-enabled': boolean;
    'plugin-id': AppId;
    'drop-count': number;
    count: number;
  };
  timestamp: number;
}
