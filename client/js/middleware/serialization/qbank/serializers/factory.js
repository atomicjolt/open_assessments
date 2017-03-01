import multipleChoice   from './multiple_choice';
import { baseItem }     from './base';
import audioUpload      from './audio_upload';
import genusTypes       from '../../../../constants/genus_types';

export default function factory(type) {
  switch (type) {
    case 'multipleChoice':
      return multipleChoice;
    case 'audioUpload':
      return audioUpload;
    default:
      return baseItem;
  }
}
