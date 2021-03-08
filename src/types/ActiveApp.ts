import { App } from './App';
import { Screensaver } from './Screensaver';

export interface ActiveApp {
  app: 'Roku' | App;
  screensaver?: Screensaver;
}
