import _ from 'lodash';
import { baseItem } from './base';
import { scrub }                 from '../../serializer_utils';
import guid from '../../../../utils/guid';
import genusTypes from '../../../../constants/genus_types';

const defaultFeedback = {
  text: '',
  fileIds: {},
};

const makeNewChoice = () => (
  {
    id: guid(),
    text: '',
  }
);

const makeChoiceText = choice => (
  `<p class='${choice.wordType}'>${choice.text}</p>`
);

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

export function serializeAnswers(correctFeedback, incorrectFeedback, originalItem) {
  const originalCorrect = _.get(originalItem, 'question.correctFeedback', {});
  const originalIncorrect = _.get(originalItem, 'question.incorrectFeedback', {});

  return [{
    id: originalCorrect.id,
    genusTypeId: genusTypes.answer.rightAnswer,
    feedback: _.get(correctFeedback, 'text') || originalCorrect.text,
  }, {
    id: originalIncorrect.id,
    genusTypeId: genusTypes.answer.wrongAnswer,
    feedback: _.get(incorrectFeedback, 'text', '') || originalIncorrect.text,
  }].map(scrub);
}

//TODO serialize fileIds

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
