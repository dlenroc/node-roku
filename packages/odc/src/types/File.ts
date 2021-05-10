export interface File {
  name: string;
  permissions: 'r' | 'rw';
  size: number;
  type: 'file';
}
