import _                          from 'lodash';
import { baseSerializeItem, baseSerializeQuestion }  from './base';
import { scrub }                  from '../../serializer_utils';

function serializeQuestion(originalQuestion, newQuestionAttributes) {
  const newQuestion = baseSerializeQuestion(originalQuestion, newQuestionAttributes);
  const updatedQuestion = {
    timeValue: newQuestionAttributes.timeValue,
  };

  return scrub(_.merge({}, newQuestion, updatedQuestion));
}

export default function audioUploadSerializer(originalItem, newItemAttributes) {
  const newItem = baseSerializeItem(originalItem, newItemAttributes);

  const { question } = newItemAttributes;
  if (question) {
    newItem.question = serializeQuestion(originalItem.question, question);
  }

  return scrub(newItem);
}
