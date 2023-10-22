import type { AppId } from './AppId.ts';

export interface App {
  id: AppId;
  type: string;
  version: string;
  name: string;
}
