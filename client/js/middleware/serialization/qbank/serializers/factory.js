import multipleChoice      from './multiple_choice';
import shortAnswer         from './short_answer';
import audioUpload         from './audio_upload';
import survey              from './reflection';
import multipleAnswer      from './multiple_answer';
import fileUpload          from './file_upload';
import moveableWordSandbox from './moveable_words_sandbox';
import types               from '../../../../constants/question_types.js';

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

    case types.fileUpload:
      return fileUpload;

    case types.moveableWordSandbox:
      return moveableWordSandbox;

    default:
      throw 'We could not find a type for serializing';
  }
}
