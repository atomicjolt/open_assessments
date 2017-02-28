import genusTypes       from '../../../../constants/genus_types';

export function baseSerializeItem(originalItem, newAttributes) {
  return {
    id: originalItem.id,
    genusTypeId: genusTypes.item[newAttributes.type],
    name: newAttributes.name,
    question: null,
    answers: null,
  };
}

export function baseSerializeQuestion(original, newAttributes) {
  return {
    id: original.id,
    genusTypeId: genusTypes.question[original.type],
    questionString: newAttributes.text,
  };
}

export default baseSerializeItem;
