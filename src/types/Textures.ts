export interface Textures {
  used: number;
  total: number;
  system: {
    width: number;
    height: number;
    size: number;
    url: string;
  }[];
  downloaded: {
    width: number;
    height: number;
    size: number;
    url: string;
  }[];
  channel: {
    width: number;
    height: number;
    size: number;
    url: string;
  }[];
}
