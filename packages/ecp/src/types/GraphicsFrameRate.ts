import { Success } from './Success';

export interface GraphicsFrameRate extends Success {
  fps: number;
  timestamp: number;
}
