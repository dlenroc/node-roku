import type { App } from './App.ts';
import type { Screensaver } from './Screensaver.ts';

export interface ActiveApp {
  app: 'Roku' | App;
  screensaver?: Screensaver;
}
