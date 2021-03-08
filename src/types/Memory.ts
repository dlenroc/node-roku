export interface Memory {
  swap: {
    total: number;
    used: number;
    free: number;
  };
  mem: {
    total: number;
    used: number;
    free: number;
    shared: number;
    cache: number;
    available: number;
  };
}
