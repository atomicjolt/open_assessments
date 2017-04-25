import _                                   from 'lodash';
import baseSerializer                      from './base';
import { scrub, getSingleCorrectAnswer } from '../../serializer_utils';

export default function shortAnswerSerializer(originalItem, newItemAttributes) {
  const newItem = baseSerializer(originalItem, newItemAttributes);
  const { question, language } = newItemAttributes;

  if (question) {
    if (question.correctFeedback) {
      newItem.answers = [
        getSingleCorrectAnswer(originalItem, question, language)];
    }

    // we always send all size attributes if we send one
    if (question.expectedLines) {
      newItem.question = {
        ...newItem.question,
        maxStrings: _.get(newItemAttributes, 'question.maxStrings'),
        expectedLength: _.get(newItemAttributes, 'question.expectedLength'),
        expectedLines: _.get(newItemAttributes, 'question.expectedLines'),
      };
    }
  }

  return scrub(newItem);
}
