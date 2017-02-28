import genusTypes       from '../../../constants/genus_types';

export default function serializeQuestion(originalItem, newAttributes) {
  return {
    id: originalItem.id,
    genusTypeId: genusTypes.item[newAttributes.type],
    name: newAttributes.name,
    question: null,
    answers: null,
  };
}
