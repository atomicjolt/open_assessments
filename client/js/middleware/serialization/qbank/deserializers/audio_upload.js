import _                        from 'lodash';
import baseDeserializer         from './base';
import { createSingleCorrectFeedback } from '../../serializer_utils';

export default function audioUpload(item) {
  const newItem = baseDeserializer(item);
  const timeValue = _.get(item, 'question.timeValue', {
    hours: '00',
    minutes: '00',
    seconds: '100'
  });

  newItem.question = {
    ...newItem.question,
    timeValue,
    correctFeedback: createSingleCorrectFeedback(item)
  };

  return newItem;
}
