import { AppId } from './AppId';
import { Success } from './Success';

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
