import multipleChoice   from './multiple_choice_serializer';

export default function factory(type) {
  switch (type) {
    case 'multipleChoice':
      return multipleChoice;

    default:
      throw `invalid type: ${type}`;
  }
}