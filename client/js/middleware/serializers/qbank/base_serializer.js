export default function serializeQuestion(originalItem, newAttributes) {
  let newItem = {
    id: originalItem.id,
    genusTypeId: genusTypes.item[newAttributes.type],
    name: newAttributes.name,
    question: null,
    answers: null,
  };

  if (originalQuestion.choices) {
    newQuestion.choices = [];
    _.forEach(originalQuestion.choices, (choice) => {
      //  TODO: make choices
    });
  }

  return newQuestion;
}

