import baseSerializer from './base_serializer';

export default function multipleChoiceSerializer(originalQuestion, newQuestionAttributes) {
  const newItem = baseSerializer(originalQuestion, newQuestionAttributes);


  // TODO: add additional stuff for this question type

}

function serializeQuestion(originalQuestion, newQuestionAttributes) {
  const newQuestion = {
    id: originalQuestion.id,
    genusTypeId: newQuestionAttributes.type,
    questionString: newQuestionAttributes.name,
    multiAnswer: newQuestionAttributes.multiAnswer,
    shuffle: newQuestionAttributes.shuffle,
    timeValue: newQuestionAttributes.timeValue,
    fileIds: {},
    choices: null,
  };

  if (originalQuestion.choices) {
    newQuestion.choices = [];
    _.forEach(originalQuestion.choices, (choice) => {
      //  TODO: make choices
    });
  }

  return newQuestion;
}

function serializeAnswers(originalQuestion, newQuestionAttributes) {
  const newAnswers = [];
  // TODO: that stuff I have below, but better
  return newAnswers;
}