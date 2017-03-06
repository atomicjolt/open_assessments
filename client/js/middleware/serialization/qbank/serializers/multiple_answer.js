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
    multiAnswer: newQuestionAttributes.multiAnswer,
    shuffle: newQuestionAttributes.shuffle,
    timeValue: newQuestionAttributes.timeValue,
    choices: null,
  };

  if (newQuestionAttributes.choices) {
    newQuestion.choices = serializeChoices(originalQuestion.choices, newQuestionAttributes.choices);
  }

  return scrub(newQuestion);
}

function serializeAnswers(originalChoices, newChoiceAttributes, oldAnswers, correctFeedback, incorrectFeedback) {
  const answers = [];
  let correctAnswer = {
    id: _.get(_.find(oldAnswers, { genusTypeId: genusTypes.answer.rightAnswer }), 'id'),
    genusTypeId: genusTypes.answer.rightAnswer,
    feedback: correctFeedback,
    type: genusTypes.answer.multipleAnswer,
    choiceIds: [],
  };
  let incorrectAnswer = {
    id: _.get(_.find(oldAnswers, { genusTypeId: genusTypes.answer.wrongAnswer }), 'id'),
    genusTypeId: genusTypes.answer.wrongAnswer,
    feedback: incorrectFeedback,
    type: genusTypes.answer.multipleAnswer,
    choiceIds: [],
  };

  _.forEach(originalChoices, (choice) => {
    const newCorrectness = _.get(newChoiceAttributes, `[${choice.id}].isCorrect`);
    if (!_.isNil(newCorrectness)) {
      if (newCorrectness) {
        correctAnswer.choiceIds.push(choice.id);
      } else { incorrectAnswer.choiceIds.push(choice.id); }
    } else if (choice.isCorrect) {
      correctAnswer.choiceIds.push(choice.id);
    } else {
      incorrectAnswer.choiceIds.push(choice.id);
    }
  });

  correctAnswer = scrub(correctAnswer);
  incorrectAnswer = scrub(incorrectAnswer);
  answers.push(correctAnswer);
  answers.push(incorrectAnswer);

  return answers;
}

function killAnswers(answers) {
  return _.map(answers, answer => ({ id: answer.id, delete: true }));
}

export default function multipleChoiceSerializer(originalItem, newItemAttributes) {
  const newItem = baseSerializer(originalItem, newItemAttributes);

  const { question } = newItemAttributes;
  if (question) {
    newItem.question = {
      ...newItem.question,
      ...serializeQuestion(originalItem.question, question)
    };
    if (question.choices || question.correctFeedback || question.incorrectFeedback) {
      if (newItemAttributes.type && originalItem.type !== newItemAttributes.type) {
        newItem.answers = killAnswers(_.get(originalItem, 'originalItem.answers'));
      } else {
        newItem.answers = serializeAnswers(
          originalItem.question.choices,
          question.choices,
          _.get(originalItem, 'originalItem.answers'),
          _.get(question, 'correctFeedback.text'),
          _.get(question, 'incorrectFeedback.text')
        );
      }
    }
  }

  return scrub(newItem);
}
