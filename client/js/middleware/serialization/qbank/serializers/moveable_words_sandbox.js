import _ from 'lodash';
import { baseItem } from './base';

export default function movableWordsSerializer(originalItem, newItemAttributes) {
  const newItem = baseItem(originalItem, newItemAttributes);

  if (!_.isEmpty(_.get(newItemAttributes, 'question.timeValue', {}))) {
    newItem.question.timeValue = _.merge(
      {},
      newItemAttributes.question.timeValue
    );
  }

  debugger;

  _.merge(
    newItem.question.choices,
    _.get(newItemAttributes, 'question.choices', [])
  );

  return newItem;
}
