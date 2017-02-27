import multipleChoice   from './multiple_choice_serializer';
import genusTypes       from '../../../constants/genus_types';

export default function factory(type) {
  switch (type) {
    case 'multipleChoice':
      return multipleChoice;

    default:
      throw `invalid type: ${type}`;
  }
}