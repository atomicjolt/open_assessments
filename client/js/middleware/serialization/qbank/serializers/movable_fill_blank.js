import _                          from 'lodash';
import baseSerializer             from './base';
import { scrub, buildChoiceText } from '../../serializer_utils';
import genusTypes                 from '../../../../constants/genus_types';
import guid                       from '../../../../utils/guid';

function serializeChoices(originalChoices, newChoiceAttributes, inlineRegionId) {
  const choices = _.map(originalChoices, (choice) => {
    const updateValues = newChoiceAttributes[choice.id];

    return {
      id: choice.id,
      text: buildChoiceText(
        _.get(updateValues, 'text') || choice.text,
        _.get(updateValues, 'wordType') || choice.wordType || 'other',
      ),
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

  return { [inlineRegionId]: { choices } };
}

function serializeQuestion(originalQuestion, newQuestionAttributes, questionString) {
  const newQuestion = {
    inlineRegions: null,
  };
  const inlineRegionId = originalQuestion.inlineRegionId || guid();

  if (newQuestionAttributes.choices) {
    newQuestion.inlineRegions = serializeChoices(
      originalQuestion.choices,
      newQuestionAttributes.choices,
      inlineRegionId
    );
  } else if (!originalQuestion.inlineRegionId) {
    newQuestion.inlineRegions = { [inlineRegionId]: { choices: [] } };
  }

  if (questionString) {
    const newQuestionString = _.cloneDeep(questionString);

    // we split on spaces, so we replace the placeholder with spaces in it
    // with the one without spaces
    const chunks = newQuestionString.text.replace('[ _ ]', '[_]').split(' ');

    newQuestionString.text = _.map(chunks, (word) => {
      if (word === '[_]') {
        return `<inlineChoiceInteraction responseIdentifier="${inlineRegionId}"></inlineChoiceInteraction>`;
      }
      return buildChoiceText(word, 'other');
    }).join('');

    newQuestion.questionString = newQuestionString;
  }

  return scrub(newQuestion);
}

function serializeAnswers(originalChoices, newChoiceAttributes, oldAnswers,
  correctFeedback, incorrectFeedback
) {
  const region = _.get(_.values(originalChoices), '[0].blankId');
  const correctId = _.findKey(newChoiceAttributes, choice => choice.isCorrect)
    || _.findKey(originalChoices, choice => choice.isCorrect);

  const answers = [];
  let correctAnswer = {
    id: _.get(_.find(oldAnswers, { genusTypeId: genusTypes.answer.rightAnswer }), 'id'),
    genusTypeId: genusTypes.answer.rightAnswer,
    feedback: _.get(correctFeedback, 'text'),
    choiceIds: [],
    fileIds: _.get(correctFeedback, 'fileIds'),
    region,
  };
  let incorrectAnswer = {
    id: _.get(_.find(oldAnswers, { genusTypeId: genusTypes.answer.wrongAnswer }), 'id'),
    genusTypeId: genusTypes.answer.wrongAnswer,
    feedback: _.get(incorrectFeedback, 'text'),
    choiceIds: [],
    fileIds: _.get(incorrectFeedback, 'fileIds'),
    region,
  };

  _.each(originalChoices, (choice) => {
    if (choice.id === correctId) {
      correctAnswer.choiceIds.push(choice.id);
    } else {
      incorrectAnswer.choiceIds.push(choice.id);
    }
  });

  correctAnswer = scrub(correctAnswer, ['choiceIds']);
  incorrectAnswer = scrub(incorrectAnswer, ['choiceIds']);
  answers.push(correctAnswer);
  answers.push(incorrectAnswer);

  return answers;
}

export default function movableFillBlank(originalItem, newItemAttributes) {
  const newItem = baseSerializer(originalItem, newItemAttributes);

  const { question } = newItemAttributes;
  if (question) {
    newItem.question = {
      ...newItem.question,
      ...serializeQuestion(originalItem.question, question, newItem.question.questionString)
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
