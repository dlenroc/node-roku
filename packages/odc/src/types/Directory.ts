import { File } from './File';

export interface Directory {
  children: (File | Directory)[];
  name: string;
  permissions: 'r' | 'rw';
  type: 'directory';
}
