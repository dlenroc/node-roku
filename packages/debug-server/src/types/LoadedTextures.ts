import type { Texture } from './Texture.ts';

export type LoadedTextures = {
  used: number;
  total: number;
  system: Texture[];
  downloaded: Texture[];
  channel: Texture[];
};
