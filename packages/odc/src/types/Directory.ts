import type { File } from './File.ts';

export interface Directory {
  children: (File | Directory)[];
  name: string;
  permissions: 'r' | 'rw';
  type: 'directory';
}
