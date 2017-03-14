import audioUpload      from './audio_upload';
import fileUpload       from './file_upload';
import movableFillBlank from './movable_fill_blank';
import multipleAnswer   from './multiple_answer';
import multipleChoice   from './multiple_choice';
import shortAnswer      from './short_answer';
import survey           from './reflection';
import types            from '../../../../constants/question_types.js';
import wordSentence     from './moveable_word_sentence';

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

    case types.movableFillBlank:
      return movableFillBlank;

    case types.moveableWordSentence:
      return wordSentence;

    default:
      throw 'We could not find a type for serializing';
  }
}
