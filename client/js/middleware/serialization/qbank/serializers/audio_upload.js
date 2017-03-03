import _                                             from 'lodash';
import { baseSerializeItem, baseSerializeQuestion }  from './base';
import { scrub, getSingleCorrectAnswer }            from '../../serializer_utils';

const defaultTimeValue = {
  hours: 0,
  minutes: 0,
  seconds: 240
};

function serializeQuestion(originalItem, newQuestionAttributes) {
  const newQuestion = baseSerializeQuestion(originalItem, newQuestionAttributes);
  if (newQuestionAttributes.timeValue) {
    newQuestion.timeValue = newQuestionAttributes.timeValue;
  }

  return scrub(newQuestion);
}

export default function audioUploadSerializer(originalItem, newItemAttributes) {
  const newItem = baseSerializeItem(originalItem, newItemAttributes);

  const { question } = newItemAttributes;


  if (question) {
    if (question.correctFeedback) {
      newItem.answers = [getSingleCorrectAnswer(originalItem, question)];
    }

    newItem.question = serializeQuestion(originalItem, question);
  }

  return scrub(newItem);
}
