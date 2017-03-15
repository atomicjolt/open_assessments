import multipleChoice   from './multiple_choice';
import shortAnswer      from './short_answer';
import audioUpload      from './audio_upload';
import imageSequence    from './image_sequence';
import survey           from './reflection';
import multipleAnswer   from './multiple_answer';
import fileUpload       from './file_upload';
import wordSentence     from './moveable_word_sentence';
import types            from '../../../../constants/question_types.js';

export default function factory(type) {
  debugger
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

    case types.imageSequence:
      return imageSequence;

    case types.moveableWordSentence:
      return wordSentence;

    default:
      throw 'We could not find a type for serializing';
  }
}
