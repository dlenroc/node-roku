import type { AppId } from './AppId.ts';
import type { Success } from './Success.ts';

export interface R2D2Bitmaps extends Success {
  timestamp: number;
  'channel-id': AppId;
  'graphics-instances': {
    rographics: {
      'sytem-memory': {
        used: number;
      };
      'texture-memory': {
        used: number;
        available: number;
        max: number;
      };
      bitmap: {
        width: number;
        height: number;
        bpp: number;
        size: number;
        name: string;
      }[];
    };
  };
}
