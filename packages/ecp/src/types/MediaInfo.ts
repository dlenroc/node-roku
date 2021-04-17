import { AppId } from './AppId';

export interface MediaInfo {
  error: boolean;
  state: 'none' | 'buffer' | 'play' | 'pause';
  is_live?: boolean;
  position?: string;
  duration?: string;
  plugin?: {
    id: AppId;
    name: string;
    bandwidth: string;
  };
  format?: {
    audio: string;
    captions: string;
    container: string;
    drm: string;
    video: string;
  };
  buffering?: {
    max: string;
    target: string;
    current: string;
  };
  new_stream?: {
    speed: string;
  };
  stream_segment?: {
    bitrate: string;
    media_sequence: string;
    segment_type: string;
    time: string;
  };
}
