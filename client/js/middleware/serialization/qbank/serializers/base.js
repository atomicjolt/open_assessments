import genusTypes       from '../../../../constants/genus_types';

export function baseSerializeItem(originalItem, newAttributes) {
  return {
    id: originalItem.id,
    genusTypeId: genusTypes.item[originalItem.type],
    name: newAttributes.name,
    question: null,
    answers: null,
  };
}

export function baseSerializeQuestion(originalItem, newAttributes) {
  return {
    id: originalItem.question.id,
    genusTypeId: genusTypes.question[originalItem.type],
    questionString: newAttributes.text,
  };
}

export default baseSerializeItem;
