import multipleChoice   from './multiple_choice';
import genusTypes       from '../../../../constants/genus_types';

export default function factory(type) {
  switch (type) {
    case genusTypes.item.multipleChoice:
      return multipleChoice;

    default:
      throw `invalid type: ${type}`;
  }
}
