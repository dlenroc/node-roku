import { AppId } from './AppId';
import { Success } from './Success';

export interface Registry extends Success {
  registry: {
    'dev-id': string;
    plugins: AppId;
    sections: unknown;
  };
}
