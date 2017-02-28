import _              from 'lodash';
import baseSerializer from './base';
import { scrub }      from '../../serializer_utils';
// import genusTypes     from '../../../../constants/genus_types';

function serializeQuestion(originalQuestion, newQuestionAttributes) {
  const newQuestion = {
    id: originalQuestion.id,
    // genusTypeId: genusTypes.default, // TODO: this probably has a real type
    questionString: newQuestionAttributes.text,
    multiAnswer: newQuestionAttributes.multiAnswer,
    shuffle: newQuestionAttributes.shuffle,
    timeValue: newQuestionAttributes.timeValue,
    fileIds: {},
    choices: null,
  };

  return scrub(newQuestion);
}

export default function audioUploadSerializer(originalItem, newItemAttributes) {
  const newItem = baseSerializer(originalItem, newItemAttributes);

  const { question } = newItemAttributes;
  if (question) {
    newItem.question = serializeQuestion(originalItem.question, question);
  }

  return scrub(newItem);
}
