import _ from 'lodash';
import { baseItem } from './base';
import guid                      from '../../../../utils/guid';

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
  {
    id: choice.id,
    text: makeChoiceText(choice),
    delete: choice.delete,
  }
);

export function serializeChoices(choices) {
  return choices.map(choice => makeChoice(choice));
}

export default function movableWordsSerializer(originalItem, newItemAttributes) {
  const newItem = baseItem(originalItem, newItemAttributes);

  if (!_.isEmpty(_.get(newItemAttributes, 'question.timeValue', {}))) {
    newItem.question.timeValue = _.merge(
      {},
      newItemAttributes.question.timeValue
    );
  }

  let choices =  _.get(newItem, 'question.choices', []);
  const newChoiceAttributes = _.get(newItemAttributes, 'question.choices', {});

  if (newChoiceAttributes.new) {
    choices.push(makeNewChoice());
  } else if (_.isArray(newChoiceAttributes)) {
    choices = choices.concat(newChoiceAttributes);
  }

  _.set(newItem, 'question.choices', serializeChoices(choices));

  return newItem;
}
