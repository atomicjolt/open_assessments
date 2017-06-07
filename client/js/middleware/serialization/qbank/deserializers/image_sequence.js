import _                  from 'lodash';
import $                  from 'jquery';
import baseDeserializer   from './base';
import genusTypes         from '../../../../constants/genus_types';
import { languages }      from '../../../../../js/constants/language_types';

function deserializeChoiceText(choice) {
  const nodes = $('<div>').html(choice.text);
  const image = $('img', nodes);
  const label = $('p', nodes);

  return {
    text: image ? image.attr('src') : '',
    altText: image ? image.attr('alt') : '',
    labelText: label ? label.text() : '',
  };
}

function deserializeChoiceTexts(choices, fileIds) {
  const all = {};
  _.each(
    choices,
    (choice) => { all[choice.languageTypeId] = deserializeChoiceText(choice, fileIds); }
  );
  return all;
}

function deserializeChoices(choices, correctAnswer, incorrectId, fileIds) {
  const newChoices = {};

  _.forEach(choices, (choice, index) => {
    const answerIndex = correctAnswer.choiceIds.indexOf(choice.id);
    const isCorrect = answerIndex >= 0;
    const texts = deserializeChoiceTexts(choice.texts, fileIds);

    newChoices[choice.id] = {
      id: choice.id,
      answerId: isCorrect ? correctAnswer.id : incorrectId,
      text: _.get(texts, `[${languages.languageTypeId.english}].text`),
      altText: _.get(texts, `[${languages.languageTypeId.english}].altText`),
      order: index + 1,
      labelText: _.get(texts, `[${languages.languageTypeId.english}].labelText`),
      texts
    };
  });

  return newChoices;
}

export default function imageSequence(item) {
  const newItem = baseDeserializer(item);
  const correctAnswer = _.find(item.answers, { genusTypeId: genusTypes.answer.rightAnswer });
  const incorrectAnswer = _.find(item.answers, { genusTypeId: genusTypes.answer.wrongAnswer });

  newItem.question = {
    ...newItem.question,
    shuffle: _.get(item, 'question.shuffle'),
    choices: deserializeChoices(
      _.get(item, 'question.multiLanguageChoices'),
      correctAnswer,
      _.get(incorrectAnswer, 'id'),
      _.get(item, 'question.fileIds')
    ),
    correctFeedback: {
      text: _.get(correctAnswer, 'feedback.text'),
      texts: _.get(correctAnswer, 'feedbacks'),
      answerId: _.get(correctAnswer, 'id'),
      fileIds: _.get(correctAnswer, 'fileIds')
    },
    incorrectFeedback: {
      text: _.get(incorrectAnswer, 'feedback.text'),
      texts: _.get(incorrectAnswer, 'feedbacks'),
      answerId: _.get(incorrectAnswer, 'id'),
      fileIds: _.get(incorrectAnswer, 'fileIds')
    },
  };

  return newItem;
}
