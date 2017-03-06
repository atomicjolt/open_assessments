import _                        from 'lodash';
import baseDeserializer         from './base';
import { createSingleCorrectFeedback } from '../../serializer_utils';

export default function shortAnswer(item) {
  const newItem = baseDeserializer(item);
  newItem.question = {
    ...newItem.question,
    correctFeedback: createSingleCorrectFeedback(item),
    maxStrings: _.get(item, 'question.maxStrings'),
    expectedLength: _.get(item, 'question.expectedLength'),
    expectedLines: _.get(item, 'question.expectedLines'),
  };

  return newItem;
}
