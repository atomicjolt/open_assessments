import audioUpload        from './audio_upload';
import base               from './base';
import dragAndDrop        from './drag_and_drop';
import fileUpload         from './file_upload';
import genusTypes         from '../../../../constants/genus_types';
import imageSequence      from './image_sequence';
import movableFillBlank   from './movable_fill_blank';
import movableWordSandbox from './movable_words_sandbox';
import multipleAnswer     from './multiple_answer';
import multipleChoice     from './multiple_choice';
import shortAnswer        from './short_answer';
import wordSentence       from './movable_word_sentence';

export default function factory(type) {
  switch (type) {
    case genusTypes.item.multipleChoice:
      return multipleChoice;

    case genusTypes.item.multipleAnswer:
    case genusTypes.item.reflection:
    case genusTypes.item.multipleReflection:
      return multipleAnswer;

    case genusTypes.item.audioUpload:
      return audioUpload;

    case genusTypes.item.shortAnswer:
      return shortAnswer;

    case genusTypes.item.fileUpload:
      return fileUpload;

    case genusTypes.item.movableFillBlank:
      return movableFillBlank;

    case genusTypes.item.movableWordSandbox:
      return movableWordSandbox;

    case genusTypes.item.movableWordSentence:
      return wordSentence;

    case genusTypes.item.imageSequence:
      return imageSequence;

    case genusTypes.item.dragAndDrop:
      return dragAndDrop;

    default:
      return base;
  }
}
