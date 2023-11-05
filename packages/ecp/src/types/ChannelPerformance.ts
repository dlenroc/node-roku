import type { AppId } from './AppId.ts';
import type { Success } from './Success.ts';

export interface ChannelPerformance extends Success {
  timestamp: string;
  plugin: {
    id: AppId;
    'cpu-percent'?: {
      'duration-seconds': number;
      user: number;
      sys: number;
    };
    memory: {
      used: number;
      res: number;
      anon: number;
      swap: number;
      file: number;
      shared: number;
      limit: number;
    };
  };
}
