import _                  from 'lodash';
import baseDeserializer   from './base';

export default function audioUpload(item) {
  const newItem = baseDeserializer(item);
  const timeValue = _.get(item, 'question.timeValue', {
    hours: '00',
    minutes: '00',
    seconds: '100'
  });

  _.merge(newItem.question, { timeValue });

  return newItem;
}
