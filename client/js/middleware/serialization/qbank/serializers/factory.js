import audioUpload      from './audio_upload';
import fileUpload       from './file_upload';
import movableFillBlank from './movable_fill_blank';
import movableWordSandbox from './movable_words_sandbox';
import multipleAnswer   from './multiple_answer';
import multipleChoice   from './multiple_choice';
import shortAnswer      from './short_answer';
import survey           from './reflection';
import wordSentence     from './movable_word_sentence';
import dragAndDrop      from './drag_and_drop';
import types            from '../../../../constants/question_types.js';
import imageSequence    from './image_sequence';

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

    case types.movableWordSandbox:
      return movableWordSandbox;

    case types.movableWordSentence:
      return wordSentence;

    case types.imageSequence:
      return imageSequence;

    case types.dragAndDrop:
      return dragAndDrop;

    default:
      throw 'We could not find a type for serializing';
  }
}
