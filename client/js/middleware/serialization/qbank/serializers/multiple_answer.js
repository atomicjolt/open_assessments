import _              from 'lodash';
import baseSerializer from './base';
import { scrub }      from '../../serializer_utils';
import genusTypes     from '../../../../constants/genus_types';
import guid           from '../../../../utils/guid';

function serializeChoices(originalChoices, newChoiceAttributes) {
  const choices = _.map(originalChoices, (choice) => {
    const updateValues = newChoiceAttributes[choice.id];
    return {
      id: choice.id,
      text: _.get(updateValues, 'text') || choice.text,
      order: _.get(updateValues, 'order') || choice.order,
      delete: _.get(updateValues, 'delete'),
    };
  });

  if (newChoiceAttributes.new) {
    choices.push({
      id: guid(),
      text: '',
      order: choices.length,
    });
  }

  return choices;
}

function serializeQuestion(originalQuestion, newQuestionAttributes) {
  const newQuestion = {
    id: originalQuestion.id,
    questionString: newQuestionAttributes.text,
    multiAnswer: newQuestionAttributes.multipleAnswer,
    shuffle: newQuestionAttributes.shuffle,
    timeValue: newQuestionAttributes.timeValue,
    fileIds: {},
    choices: null,
  };

  if (newQuestionAttributes.choices) {
    newQuestion.choices = serializeChoices(originalQuestion.choices, newQuestionAttributes.choices);
  }

  return scrub(newQuestion);
}

function serializeAnswers(originalChoices, newChoiceAttributes) {
  let correctAnswers = {
    id: null,
    genusTypeId: genusTypes.answer.rightAnswer,
    feedback: null,
    type: genusTypes.question.multipleSelection,
    choiceIds: [],
  };
  const answers = [];

  _.forEach(originalChoices, (choice) => {
    const updatedChoice = newChoiceAttributes[choice.id];
    if (choice.isCorrect || (updatedChoice && updatedChoice.isCorrect)) {
      if (!correctAnswers.id) { correctAnswers.id = choice.answerId }
      if (updatedChoice && updatedChoice.feedback) {
        correctAnswers.feedback = updatedChoice.feedback;
      } else {
        correctAnswers.feedback = choice.feedback;
      }
      correctAnswers.choiceIds.push(choice.id);
    } else {
      answers.push({
        id: choice.answerId,
        genusTypeId: genusTypes.answer.wrongAnswer,
        feedback: _.get(updatedChoice, 'feedback') || choice.feedback,
        type: genusTypes.answer.multipleChoice,
        choiceIds: [choice.id],
      })
    }
  });

  correctAnswers = scrub(correctAnswers);

  if (correctAnswers.choiceIds) {
    answers.push(correctAnswers);
  }

  return _.map(answers);
}

export default function multipleChoiceSerializer(originalItem, newItemAttributes) {
  const newItem = baseSerializer(originalItem, newItemAttributes);

  const { question } = newItemAttributes;
  if (question) {
    newItem.question = serializeQuestion(originalItem.question, question);
    if (question.choices) {
      newItem.answers = serializeAnswers(originalItem.question.choices, question.choices);
    }
  }

  return scrub(newItem);
}
