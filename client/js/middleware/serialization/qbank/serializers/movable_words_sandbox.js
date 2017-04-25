import _ from 'lodash';

import { baseItem }                       from './base';
import { scrub, getSingleCorrectAnswer }  from '../../serializer_utils';
import guid                               from '../../../../utils/guid';

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

export default function movableWordsSerializer(originalItem, newItemAttributes) {
  const newItem = baseItem(originalItem, newItemAttributes);
  const { question, language } = newItemAttributes;

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

  const correctFeedback = _.get(question, 'correctFeedback');

  if (correctFeedback) {
    newItem.answers = [
      getSingleCorrectAnswer(originalItem, question, language)
    ];
  }
  return newItem;
}
