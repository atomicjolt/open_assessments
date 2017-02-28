import multipleChoice   from './multiple_choice';

export default function factory(type) {
  switch (type) {
    case 'multipleChoice':
      return multipleChoice;

    default:
      throw `invalid type: ${type}`;
  }
}
