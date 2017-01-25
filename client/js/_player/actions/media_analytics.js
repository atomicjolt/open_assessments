import wrapper from '../../constants/wrapper';

export const Constants = wrapper([], [
  'AUDIO_PLAY',
  'AUDIO_RECORD_START',
  'AUDIO_RECORD_STOP',
  'AUDIO_PAUSE',
  'AUDIO_ENDED',
  'VIDEO_PLAY',
  'VIDEO_PAUSE',
  'VIDEO_ENDED'
]);

export function audioPlay(mediaId, mediaTime) {
  return {
    type: Constants.AUDIO_PLAY,
    mediaTime,
    mediaId
  };
}

export function audioPause(mediaId, mediaTime) {
  return {
    type: Constants.AUDIO_PAUSE,
    mediaTime,
    mediaId
  };
}

export function audioEnded(mediaId, mediaTime) {
  return {
    type: Constants.AUDIO_ENDED,
    mediaTime,
    mediaId
  };
}

export function videoPlay(mediaId, mediaTime) {
  return {
    type: Constants.VIDEO_PLAY,
    mediaTime,
    mediaId
  };
}

export function videoPause(mediaId, mediaTime) {
  return {
    type: Constants.VIDEO_PAUSE,
    mediaTime,
    mediaId
  };
}

export function videoEnded(mediaId, mediaTime) {
  return {
    type: Constants.VIDEO_ENDED,
    mediaTime,
    mediaId
  };
}

export function audioRecordStart() {
  return {
    type: Constants.AUDIO_RECORD_START
  };
}

export function audioRecordStop(mediaTime) {
  return {
    type: Constants.AUDIO_RECORD_STOP,
    mediaTime
  };
}
