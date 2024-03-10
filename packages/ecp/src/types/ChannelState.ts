import type { AppId } from './AppId.js';

export interface ChannelState {
  'channel-id': AppId;
  'channel-state': string;
  'channel-version': string;
}
