import _                         from 'lodash';
import baseSerializer            from './base';
import { baseSerializeQuestion } from './base';
import { scrub }                 from '../../serializer_utils';
import genusTypes                from '../../../../constants/genus_types';
import guid                      from '../../../../utils/guid';

function serializeChoices(originalChoices, newChoiceAttributes) {
  const choices = _.map(originalChoices, (choice) => {
    const updateValues = newChoiceAttributes[choice.id];
    return {
      id: choice.id,
      text: _.get(updateValues, 'text') || choice.text,
      order: _.get(updateValues, 'order') || choice.order,
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
    shuffle: _.isNil(newQuestionAttributes.maintainOrder) ? null : !newQuestionAttributes.maintainOrder,
    timeValue: newQuestionAttributes.timeValue,
    choices: null,
  };

  if (newQuestionAttributes.choices) {
    newQuestion.choices = serializeChoices(originalQuestion.choices, newQuestionAttributes.choices);
  }

  return scrub(newQuestion);
}

function correctAnswer(correctId, choiceId, wasCorrect) {
  if (_.isNil(correctId)) {
    return wasCorrect ? genusTypes.answer.rightAnswer : genusTypes.answer.wrongAnswer;
  }
  return correctId === choiceId ? genusTypes.answer.rightAnswer : genusTypes.answer.wrongAnswer;
}

function serializeAnswers(originalChoices, newChoiceAttributes) {
  let correctId = null;
  _.forEach(newChoiceAttributes, (choice, key) => {
    if (_.get(choice, 'isCorrect')) { correctId = key; }
  });

  return _.map(originalChoices, (choice) => {
    const updateValues = newChoiceAttributes[choice.id];
    return scrub({
      id: choice.answerId,
      genusTypeId: correctAnswer(correctId, choice.id, choice.isCorrect),
      feedback: _.get(updateValues, 'feedback') || choice.feedback,
      type: genusTypes.answer.multipleChoice,
      choiceIds: [choice.id],
    });
  });
}

export default function multipleChoiceSerializer(originalItem, newItemAttributes) {
  const newItem = baseSerializer(originalItem, newItemAttributes);

  const { question } = newItemAttributes;
  if (question) {
    newItem.question = {
      ...newItem.question,
      ...serializeQuestion(originalItem.question, question)
    };

    if (question.choices) {
      newItem.answers = serializeAnswers(originalItem.question.choices, question.choices);
    }
  }
  return scrub(newItem);
}
