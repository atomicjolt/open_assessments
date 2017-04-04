import _                          from 'lodash';
import baseSerializer             from './base';
import { scrub, buildChoiceText } from '../../serializer_utils';
import genusTypes                 from '../../../../constants/genus_types';
import guid                       from '../../../../utils/guid';

const defaultWordChoice = 'other';

function serializeChoices(originalChoices, newChoiceAttributes) {
  const choices = _.map(originalChoices, (choice) => {
    const updateValues = newChoiceAttributes[choice.id];
    const newOrder = _.get(updateValues, 'order');
    const newWordType = _.get(updateValues, 'wordType');
    return {
      id: choice.id,
      text: buildChoiceText(
        _.get(updateValues, 'text') || choice.text,
        newWordType || choice.wordType || defaultWordChoice,
      ),
      order: _.isNil(newOrder) ? choice.order : newOrder,
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
    shuffle: _.isNil(newQuestionAttributes.shuffle) ? null : newQuestionAttributes.shuffle,
    choices: null,
  };

  if (newQuestionAttributes.choices) {
    newQuestion.choices = serializeChoices(originalQuestion.choices, newQuestionAttributes.choices);
  }

  return scrub(newQuestion);
}

function serializeAnswers(choices, newChoiceAttributes, oldAnswers, correctFeedback, incorrectFeedback) {
  const answers = [];
  const updatedChoices = _.cloneDeep(choices);
  _.forEach(newChoiceAttributes, (choice, id) => {
    updatedChoices[id] = { ...updatedChoices[id], ...choice };
  });

  let correctAnswer = {
    id: _.get(_.find(oldAnswers, { genusTypeId: genusTypes.answer.rightAnswer }), 'id'),
    genusTypeId: genusTypes.answer.rightAnswer,
    feedback: _.get(correctFeedback, 'text'),
    type: genusTypes.answer.multipleAnswer,
    choiceIds: _(updatedChoices)
      .filter(choice => !_.isNil(choice.answerOrder) && choice.answerOrder !== '')
      .orderBy('answerOrder').map('id')
      .value(),
    fileIds: _.get(correctFeedback, 'fileIds'),
  };
  let incorrectAnswer = {
    id: _.get(_.find(oldAnswers, { genusTypeId: genusTypes.answer.wrongAnswer }), 'id'),
    genusTypeId: genusTypes.answer.wrongAnswer,
    feedback: _.get(incorrectFeedback, 'text'),
    type: genusTypes.answer.multipleAnswer,
    choiceIds: _.map(_.filter(updatedChoices, { answerOrder: null }), 'id'),
    fileIds: _.get(incorrectFeedback, 'fileIds'),
  };

  correctAnswer = scrub(correctAnswer);
  incorrectAnswer = scrub(incorrectAnswer);
  answers.push(correctAnswer);
  answers.push(incorrectAnswer);

  return answers;
}

export default function movableWordSentence(originalItem, newItemAttributes) {
  const newItem = baseSerializer(originalItem, newItemAttributes);

  const { question } = newItemAttributes;
  if (question) {
    newItem.question = {
      ...newItem.question,
      ...serializeQuestion(originalItem.question, question)
    };

    if (question.choices || question.correctFeedback || question.incorrectFeedback) {
      newItem.answers = serializeAnswers(
        originalItem.question.choices,
        question.choices,
        _.get(originalItem, 'originalItem.answers'),
        _.get(question, 'correctFeedback'),
        _.get(question, 'incorrectFeedback')
      );
    }
  }
  return scrub(newItem);
}
