import _                                              from 'lodash';
import baseSerializer                                 from './base';
import {
  scrub,
  buildChoiceText,
  languageText,
  extractAllLanguageChoices,
  addNewChoices
}                                                     from '../../serializer_utils';
import genusTypes                                     from '../../../../constants/genus_types';
import guid                                           from '../../../../utils/guid';

const defaultWordChoice = 'other';

function serializeChoices(originalChoices, newChoiceAttributes, lang) {
  const allChoices = extractAllLanguageChoices(addNewChoices(originalChoices, lang));
  const choices = _.map(allChoices, (choice) => {
    const { language } = choice;
    const updateValues = newChoiceAttributes[choice.id];
    const newOrder = _.get(updateValues, 'order');
    const newWordType = _.get(updateValues, 'wordType');

    const newText = lang && lang === choice.language ?
      _.get(updateValues, 'text') : '';
    const text = buildChoiceText(
      newText || choice.text,
      newWordType || choice.wordType || defaultWordChoice,
    );

    return {
      id: choice.id,
      text: languageText(text, language),
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

function serializeQuestion(originalQuestion, newQuestionAttributes, language) {
  const newQuestion = {
    shuffle: _.isNil(newQuestionAttributes.shuffle) ? null : newQuestionAttributes.shuffle,
    choices: null,
  };

  if (newQuestionAttributes.choices) {
    newQuestion.choices =
      serializeChoices(originalQuestion.choices, newQuestionAttributes.choices, language);
  }

  return scrub(newQuestion);
}

function serializeAnswers(choices, newChoiceAttributes, oldAnswers, correctFeedback,
  incorrectFeedback, language
) {
  const answers = [];
  const updatedChoices = _.cloneDeep(choices);
  _.forEach(newChoiceAttributes, (choice, id) => {
    updatedChoices[id] = { ...updatedChoices[id], ...choice };
  });

  let correctAnswer = {
    id: _.get(_.find(oldAnswers, { genusTypeId: genusTypes.answer.rightAnswer }), 'id'),
    genusTypeId: genusTypes.answer.rightAnswer,
    feedback: languageText(_.get(correctFeedback, 'text'), language),
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
    feedback: languageText(_.get(incorrectFeedback, 'text'), language),
    type: genusTypes.answer.multipleAnswer,
    choiceIds: [],
    fileIds: _.get(incorrectFeedback, 'fileIds'),
  };

  correctAnswer = scrub(correctAnswer);
  incorrectAnswer = scrub(incorrectAnswer, 'choiceIds');
  answers.push(correctAnswer);
  answers.push(incorrectAnswer);

  return answers;
}

export default function movableWordSentence(originalItem, newItemAttributes) {
  const newItem = baseSerializer(originalItem, newItemAttributes);

  const { question, language } = newItemAttributes;
  if (question) {
    newItem.question = {
      ...newItem.question,
      ...serializeQuestion(originalItem.question, question, language)
    };

    if (question.choices || question.correctFeedback || question.incorrectFeedback) {
      newItem.answers = serializeAnswers(
        originalItem.question.choices,
        question.choices,
        _.get(originalItem, 'originalItem.answers'),
        _.get(question, 'correctFeedback'),
        _.get(question, 'incorrectFeedback'),
        language
      );
    }
  }

  return scrub(newItem);
}
