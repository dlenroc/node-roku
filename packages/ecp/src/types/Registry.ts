import type { AppId } from './AppId.ts';
import type { Success } from './Success.ts';

export interface Registry extends Success {
  registry: {
    'dev-id': string;
    plugins: AppId;
    'space-available': number;
    sections: {
      section: {
        name: string;
        items: { key: string; value: unknown }[];
      };
    };
  };
}
