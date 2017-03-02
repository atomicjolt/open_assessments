import multipleChoice   from './multiple_choice';
import { baseItem }     from './base';
import shortAnswer      from './short_answer';
import audioUpload      from './audio_upload';
import survey           from './survey';
import multipleAnswer   from './multiple_answer';
import types            from '../../../../constants/question_types.js';

export default function factory(type) {
  switch (type) {
    case types.multipleChoice:
      return multipleChoice;

    case types.shortAnswer:
      return shortAnswer;

    case types.audioUpload:
      return audioUpload;

    case types.reflection:
    case types.multipleReflection:
      return survey;

    case types.multipleAnswer:
      return multipleAnswer;

    default:
      return baseItem;
  }
}
