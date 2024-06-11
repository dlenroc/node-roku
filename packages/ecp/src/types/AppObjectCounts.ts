import type { AppId } from './AppId.ts';
import type { Success } from './Success.ts';

export interface AppObjectCounts extends Success {
  'channel-id': AppId;
  'channel-title': string;
  'channel-version': string;
  objects: {
    'objects-count': number;
    objects: {
      object: {
        type: string;
        count: number;
      }[];
    };
  };
}
