import _ from 'lodash';
import { baseItem } from './base';
import guid                      from '../../../../utils/guid';

const newChoice = () => (
  {
    id: guid(),
    text: '',
  }
);

export default function movableWordsSerializer(originalItem, newItemAttributes) {
  const newItem = baseItem(originalItem, newItemAttributes);

  if (!_.isEmpty(_.get(newItemAttributes, 'question.timeValue', {}))) {
    newItem.question.timeValue = _.merge(
      {},
      newItemAttributes.question.timeValue
    );
  }


  // Serialize all choices
  const choices =  _.get(newItem, 'question.choices', []);

  const newChoiceAttributes = _.get(newItemAttributes, 'question.choices', {});
  if (newChoiceAttributes.new) { choices.push(newChoice()); }
  //TODO serialize choices
  _.set(newItem, 'question.choices', choices);

  return newItem;
}
