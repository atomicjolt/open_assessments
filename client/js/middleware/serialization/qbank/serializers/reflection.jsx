import _              from 'lodash';
import baseSerializer from './base';
import { scrub }      from '../../serializer_utils';
import genusTypes     from '../../../../constants/genus_types';
import guid           from '../../../../utils/guid';

function serializeChoices(originalChoices, newChoiceAttributes) {
  const choices = _.map(originalChoices, (choice) => {
    const updateValues = newChoiceAttributes[choice.id];
    return {
      id: choice.id,
      text: _.get(updateValues, 'text', choice.text),
      order: _.get(updateValues, 'order', choice.order),
      delete: _.get(updateValues, 'delete'),
    };
  });

  if (newChoiceAttributes.new) {
    choices.push({
      id: guid(),
      text: '',
      order: choices.length,
    });
  }

  return choices;
}

function serializeQuestion(originalQuestion, newQuestionAttributes) {
  const newQuestion = {
    multiAnswer: newQuestionAttributes.multiAnswer,
    shuffle: newQuestionAttributes.shuffle,
    timeValue: newQuestionAttributes.timeValue,
    choices: null,
  };

  if (newQuestionAttributes.choices) {
    newQuestion.choices = serializeChoices(originalQuestion.choices, newQuestionAttributes.choices);
  }

  return scrub(newQuestion);
}

function serializeAnswers(originalChoices, feedback, multi) {
  return [{
    id: _.get(_.find(originalChoices, { isCorrect: true }), 'answerId'),
    genusTypeId: genusTypes.answer.rightAnswer,
    feedback,
    type: multi ? genusTypes.question.multipleReflection : genusTypes.question.reflection,
    choiceIds: _.map(originalChoices, 'id'),
  }];
}


export default function surveySerializer(originalItem, newItemAttributes) {
  const newItem = baseSerializer(originalItem, newItemAttributes);

  const { question } = newItemAttributes;
  if (question) {
    newItem.question = {
      ...newItem.question,
      ...serializeQuestion(originalItem.question, question)
    };
    if (question.choices) {
      newItem.answers = serializeAnswers(
        originalItem.question.choices,
        question.correctFeedback,
        item.type === genusTypes.item.multipleReflection
      );
    }
  }

  return scrub(newItem);
}
