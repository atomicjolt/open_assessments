import _ from 'lodash';
import { baseItem } from './base';
import { scrub } from '../../serializer_utils';
import guid from '../../../../utils/guid';
import genusTypes from '../../../../constants/genus_types';

const makeChoiceText = (choice) => {
  if (choice.wordType) {
    return `<p class='${choice.wordType}'>${choice.text}</p>`;
  }
  return `<p>${choice.text}</p>`;
};

const makeChoice = choice => (
  scrub({
    delete: choice.delete,
    id: choice.id,
    text: makeChoiceText(choice),
  })
);


export function serializeChoices(choices) {
  return _.map(choices, (choice => makeChoice(choice)));
}

export function serializeFileIds(correctFeedback, incorrectFeedback) {
  return {
    ..._.get(correctFeedback, 'fileIds', {}),
    ..._.get(incorrectFeedback, 'fileIds', {}),
  };
}

export function serializeAnswers(correctFeedback, incorrectFeedback, originalItem) {
  const originalCorrect = _.get(originalItem, 'question.correctFeedback', {});
  const originalIncorrect = _.get(originalItem, 'question.incorrectFeedback', {});

  return [{
    id: originalCorrect.id,
    genusTypeId: genusTypes.answer.rightAnswer,
    feedback: _.get(correctFeedback, 'text') || originalCorrect.text,
    fileIds: _.get(correctFeedback, 'fileIds', {}),
  }, {
    id: originalIncorrect.id,
    genusTypeId: genusTypes.answer.wrongAnswer,
    feedback: _.get(incorrectFeedback, 'text', '') || originalIncorrect.text,
    fileIds: _.get(incorrectFeedback, 'fileIds', {}),
  }].map(scrub);
}

export default function movableWordsSerializer(originalItem, newItemAttributes) {
  const newItem = baseItem(originalItem, newItemAttributes);

  // Serialize timeValue
  if (!_.isEmpty(_.get(newItemAttributes, 'question.timeValue', {}))) {
    newItem.question.timeValue = _.merge(
      {},
      newItemAttributes.question.timeValue
    );
  }

  // Serialize choices
  let choices =  _.get(newItem, 'question.choices', {});
  const newChoiceAttributes = _.get(newItemAttributes, 'question.choices', {});
  if (newChoiceAttributes.new) {
    const id = guid();
    choices[id] = {
      id,
      text: '',
    };
  } else if (!_.isEmpty(newChoiceAttributes)) {
    choices = _.merge(
      {},
      _.get(originalItem, 'question.choices', {}),
      choices,
      newChoiceAttributes
    );
  }

  if (!_.isEmpty(choices)) {
    _.set(newItem, 'question.choices', serializeChoices(choices));
  }

  // Serialize answers
  const correctFeedback =
    _.get(newItemAttributes, 'question.correctFeedback');
  const incorrectFeedback =
    _.get(newItemAttributes, 'question.incorrectFeedback');

  if (correctFeedback || incorrectFeedback) {
    const answers = serializeAnswers(
      correctFeedback,
      incorrectFeedback,
      originalItem,
    );
    newItem.answers = answers;
  }

  return newItem;
}
