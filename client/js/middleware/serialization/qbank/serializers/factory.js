import multipleChoice   from './multiple_choice';
import base             from './base';
import genusTypes       from '../../../../constants/genus_types';

export default function factory(type) {
  switch (type) {
    case 'multipleChoice':
      return multipleChoice;

    default:
      return base;
  }
}
