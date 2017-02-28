import genusTypes       from '../../../../constants/genus_types';

export default function serializeItem(originalItem, newAttributes) {
  return {
    id: originalItem.id,
    genusTypeId: genusTypes.item[newAttributes.type],
    name: newAttributes.name,
    question: null,
    answers: null,
  };
}

//TODO add default question
export function serializeQuestion(original, newAttributes){
  return {};
}
