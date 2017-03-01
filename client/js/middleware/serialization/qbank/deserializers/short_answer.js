import _                  from 'lodash';
import baseDeserializer   from './base';

export default function shortAnswer(item) {
  const newItem = baseDeserializer(item);
  newItem.question = {
    ...newItem.question,
    maxStrings: _.get(item, 'question.maxStrings'),
    expectedLength: _.get(item, 'question.expectedLength'),
    expectedLines: _.get(item, 'question.expectedLines'),
  };

  return newItem;
}
