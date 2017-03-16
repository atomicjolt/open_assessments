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
  {
    id: choice.id,
    text: makeChoiceText(choice),
    delete: choice.delete,
  }
);


export function serializeChoices(choices) {
  return choices.map(choice => makeChoice(choice));
}

export function serializeAnswers(choices, correctFeedback, incorrectFeedback) {
  return [{
    genusTypeId: genusTypes.answer.rightAnswer,
    choiceIds: _.map(choices, choice => choice.id),
    feedback: _.get(correctFeedback, 'text', ''),
    fileIds: _.get(correctFeedback, 'fileIds', {}),
  }, {
    genusTypeId: genusTypes.answer.wrongAnswer,
    choiceIds: [],
    feedback: _.get(incorrectFeedback, 'text', ''),
    fileIds: _.get(incorrectFeedback, 'fileIds', {}),
  }].map(scrub);
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


  const answers = serializeAnswers(
    _.get(originalItem, 'question.choices'),
    _.get(newItemAttributes, 'question.correctFeedback'),
    _.get(newItemAttributes, 'question.incorrectFeedback'),
  );
  newItem.answers = answers;

  return newItem;
}
