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

function serializeAnswers(originalChoices, newChoiceAttributes) {
  let newFeedback = null;
  _.forEach(newChoiceAttributes, (choice) => {
    if (choice.feedback) { newFeedback = choice.feedback; }
  });

  return _.map(originalChoices, choice => scrub({
    id: choice.answerId,
    genusTypeId: genusTypes.answer.rightAnswer,
    feedback: newFeedback || choice.feedback,
    type: genusTypes.answer.multipleChoice,  // TODO: probably wrong
    choiceIds: [choice.id],
  }));
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
      newItem.answers = serializeAnswers(originalItem.question.choices, question.choices);
    }
  }

  return scrub(newItem);
}
