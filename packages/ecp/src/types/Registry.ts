import type { AppId } from './AppId.ts';
import type { Success } from './Success.ts';

export interface Registry extends Success {
  registry: {
    'dev-id': string;
    plugins: AppId;
    sections: unknown;
  };
}
