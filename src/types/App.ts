import { AppId } from './AppId';

export interface App {
  id: AppId;
  type: string;
  version: string;
  name: string;
}
