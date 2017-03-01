import multipleChoice   from './multiple_choice';
import shortAnswer      from './short_answer';

export default function factory(type) {
  switch (type) {
    case 'multipleChoice':
      return multipleChoice;
    case 'shortAnswer':
      return shortAnswer;
    default:
      throw `invalid type: ${type}`;
  }
}
