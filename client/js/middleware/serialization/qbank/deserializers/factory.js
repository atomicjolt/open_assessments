import audioUpload      from './audio_upload';
import base             from './base';
import multipleChoice   from './multiple_choice';
import genusTypes       from '../../../../constants/genus_types';

export default function factory(type) {
  switch (type) {
    case genusTypes.item.multipleChoice:
      return multipleChoice;

    case genusTypes.item.audioUpload:
      return audioUpload;

    default:
      return base;
  }
}
