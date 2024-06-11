import type { AppId } from './AppId.ts';
import type { Success } from './Success.ts';

export interface AppState extends Success {
  'app-id': AppId;
  'app-title': string;
  'app-version': string;
  state: 'active' | 'background' | 'inactive';
}
