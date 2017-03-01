import multipleChoice   from './multiple_choice';
import shortAnswer      from './short_answer';
import audioUpload      from './audio_upload';

export default function factory(type) {
  switch (type) {
    case 'multipleChoice':
      return multipleChoice;

    case 'shortAnswer':
      return shortAnswer;

    case 'audioUpload':
      return audioUpload;

    default:
      throw `invalid type: ${type}`;
  }
}
