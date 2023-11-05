import type { App } from './App.ts';

export interface ActiveApp {
  app: { name: string } | App;
  screensaver?: App;
}
