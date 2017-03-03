import audioUpload      from './audio_upload';
import base             from './base';
import shortAnswer      from './short_answer';
import multipleChoice   from './multiple_choice';
import fileUpload       from './file_upload';
import genusTypes       from '../../../../constants/genus_types';

export default function factory(type) {
  switch (type) {
    case genusTypes.item.multipleChoice:
    case genusTypes.item.reflection:
    case genusTypes.item.multipleReflection:
    case genusTypes.item.multipleAnswer:
      return multipleChoice;

    case genusTypes.item.audioUpload:
      return audioUpload;

    case genusTypes.item.shortAnswer:
      return shortAnswer;

    case genusTypes.item.fileUpload:
      return fileUpload;

    default:
      return base;
  }
}
