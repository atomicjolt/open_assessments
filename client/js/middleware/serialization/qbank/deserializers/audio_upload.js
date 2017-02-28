import _                  from 'lodash';
import baseDeserializer   from './base';
import genusTypes         from '../../../../constants/genus_types';

export default function audioUpload(item) {
  const newItem = baseDeserializer(item);
  _.merge(newItem.question, {
    timeValue: {
      hours: '00',
      minutes: '00',
      seconds: '100'
    }
  });

  return newItem;
}
