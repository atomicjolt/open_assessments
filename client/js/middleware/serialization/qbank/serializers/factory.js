import multipleChoice   from './multiple_choice';
import { baseItem }     from './base';
import shortAnswer      from './short_answer';
import audioUpload      from './audio_upload';
import survey           from './survey';
import genusTypes       from '../../../../constants/genus_types';

export default function factory(type) {
  switch (type) {
    case 'multipleChoice':
      return multipleChoice;

    case 'shortAnswer':
      return shortAnswer;

    case 'audioUpload':
      return audioUpload;

    case 'reflection':
    case 'multipleReflection':
      return survey;

    default:
      return baseItem;
  }
}
