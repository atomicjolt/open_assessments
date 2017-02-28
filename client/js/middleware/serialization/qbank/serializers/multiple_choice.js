import _              from 'lodash';
import baseSerializer from './base';
import { scrub }      from '../../serializer_utils';
import genusTypes     from '../../../../constants/genus_types';

function serializeChoices(originalChoices, newChoiceAttributes) {
  return _.map(originalChoices, (choice) => {
    const updateValues = newChoiceAttributes[choice.id];
    return {
      id: choice.id,
      text: _.get(updateValues, 'text') || choice.text,
      order: _.get(updateValues, 'order') || choice.order,
      delete: _.get(updateValues, 'delete'),
    };
  });
}

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

  if (newQuestionAttributes.choices) {
    newQuestion.choices = serializeChoices(originalQuestion.choices, newQuestionAttributes.choices);
  }

  return scrub(newQuestion);
}

function correctAnswer(wasCorrect, isCorrect) {
  if (_.isUndefined(isCorrect)) {
    return wasCorrect ? genusTypes.answer.rightAnswer : genusTypes.answer.wrongAnswer;
  }
  return isCorrect ? genusTypes.answer.rightAnswer : genusTypes.answer.wrongAnswer;
}

function serializeAnswers(originalChoices, newChoiceAttributes) {
  return _.map(originalChoices, (choice) => {
    const updateValues = newChoiceAttributes[choice.id];
    return {
      id: choice.answerId,
      genusTypeId: correctAnswer(choice.isCorrect, _.get(updateValues, 'isCorrect')),
      feedback: _.get(updateValues, 'feedback') || choice.feedback,
      type: genusTypes.answer.multipleChoice,
      choiceIds: [choice.id],
    };
  });
}


export default function multipleChoiceSerializer(originalItem, newItemAttributes) {
  const newItem = baseSerializer(originalItem, newItemAttributes);

  const { question } = newItemAttributes;
  if (question) {
    newItem.question = serializeQuestion(originalItem.question, question);
    if (question.choices) {
      newItem.answers = serializeAnswers(originalItem.question.choices, question.choices);
    }
  }

  return scrub(newItem);
}
