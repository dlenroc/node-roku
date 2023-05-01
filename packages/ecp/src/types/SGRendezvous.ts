import { AppId } from './AppId';
import { Success } from './Success';

export interface SGRendezvousStatus extends Success {
  data: {
    'tracking-enabled': boolean;
    'plugin-id': AppId;
    'drop-count': number;
    count: number;
  };
  timestamp: number;
}
