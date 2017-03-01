import _                from 'lodash';
import genusTypes       from '../../../../constants/genus_types';
import { scrub }        from '../../serializer_utils';

export function baseSerializeQuestion(originalItem, newAttributes) {
  return {
    id: _.get(originalItem, 'question.id'),
    genusTypeId: genusTypes.question[originalItem.type],
    questionString: newAttributes.text,
  };
}

export function baseSerializeItem(originalItem, newAttributes) {
  const newItem = {
    id: originalItem.id,
    genusTypeId: genusTypes.item[originalItem.type],
    name: _.get(newAttributes, 'name', originalItem.name),
    question: scrub(
      baseSerializeQuestion(originalItem, newAttributes.question || {})
    ),
    answers: null,
  };
  return newItem;
}

export function baseItem(originalItem, newAttributes) {
  return scrub(baseSerializeItem(originalItem, newAttributes));
}

export default baseSerializeItem;
