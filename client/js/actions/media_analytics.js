"use strict";

import wrapper from "../constants/wrapper";

export const Constants = wrapper([],[
  "AUDIO_PLAY",
  "AUDIO_RECORD_START",
  "AUDIO_RECORD_STOP",
  "AUDIO_PAUSE",
  "AUDIO_STOP",
  "VIDEO_PLAY",
  "VIDEO_PAUSE",
  "VIDEO_STOP"
]);

export function audioPlay(mediaTime, mediaId) {
  return {
    type: Constants.AUDIO_PLAY,
    mediatTime,
    mediaId
  };
}

export function audioRecordStart(mediaId) {
  return {
    type: Constants.AUDIO_RECORD_START,
    mediatTime,
    mediaId
  };
}

export function audioRecordStop(mediaId) {
  return {
    type: Constants.AUDIO_RECORD_STOP,
    mediatTime,
    mediaId
  };
}

export function audioPause(mediaTime, mediaId) {
  return {
    type: Constants.AUDIO_PAUSE,
    mediatTime,
    mediaId
  };
}

export function audioStop(mediaTime, mediaId) {
  return {
    type: Constants.AUDIO_STOP,
    mediatTime,
    mediaId
  };
}

export function videoPlay(mediaTime, mediaId) {
  return {
    type: Constants.VIDEO_PLAY,
    mediatTime,
    mediaId
  };
}

export function videoPause(mediaTime, mediaId) {
  return {
    type: Constants.VIDEO_PAUSE,
    mediatTime,
    mediaId
  };
}

export function videoStop(mediaTime, mediaId) {
  return {
    type: Constants.VIDEO_STOP,
    mediatTime,
    mediaId
  };
}
