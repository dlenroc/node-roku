import type { Success } from './Success.ts';

export interface GraphicsFrameRate extends Success {
  fps: number;
  timestamp: number;
}
