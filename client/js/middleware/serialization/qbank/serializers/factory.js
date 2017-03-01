import multipleChoice   from './multiple_choice';
import { baseItem }     from './base';
import shortAnswer      from './short_answer';
import audioUpload      from './audio_upload';
import survey           from './survey';
import base             from './base';

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
<<<<<<< HEAD
      return baseItem;
=======
      return base;
>>>>>>> 0f1667f191b87e897312b03376f3509054e39524
  }
}
