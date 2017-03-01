import _              from 'lodash';
import baseSerializer from './base';
import { scrub }      from '../../serializer_utils';

export default function shortAnswerSerializer(originalItem, newItemAttributes) {
  const newItem = baseSerializer(originalItem, newItemAttributes);

  newItem.question = {
    ...newItem.question,
    maxStrings: _.get(newItemAttributes, 'question.maxStrings'),
    expectedLength: _.get(newItemAttributes, 'question.expectedLength'),
    expectedLines: _.get(newItemAttributes, 'question.expectedLines'),
  };

  return scrub(newItem);
}
