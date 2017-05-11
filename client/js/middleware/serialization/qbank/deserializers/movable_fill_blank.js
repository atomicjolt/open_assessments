import _                  from 'lodash';
import $                  from 'jquery';
import baseDeserializer   from './base';
import genusTypes         from '../../../../constants/genus_types';
import { parseChoiceText,
         parseChoiceWordType,
         deserializeMultiLanguageChoice
        } from '../../serializer_utils';

function deserializeChoices(choices, answers, blankId) {
  const newChoices = {};

  _.forEach(choices, (choice) => {
    const multiLangAttributes = deserializeMultiLanguageChoice(choice);
    newChoices[choice.id] = {
      id: choice.id,
      answerId: null,
      text: parseChoiceText(choice.text),
      wordType: parseChoiceWordType(choice.text),
      isCorrect: false,
      blankId,
      ...multiLangAttributes
    };
    _.forEach(answers, (answer) => {
      if (_.includes(_.get(answer, `inlineRegions.${blankId}.choiceIds`), choice.id)) {
        newChoices[choice.id] = {
          ...newChoices[choice.id],
          feedback: _.get(answer, 'feedback.text'),
          isCorrect: answer.genusTypeId === genusTypes.answer.rightAnswer,
          answerId: answer.id,
        };
      }
    });
  });
  return newChoices;
}

function convertToText(text) {
  const html = $('<div></div>').html(text);
  const nodeTexts = $('p, inlineChoiceInteraction', html).map((index, node) => {
    if (node.nodeName === 'INLINECHOICEINTERACTION') {
      return '[_]';
    }
    return node.textContent;
  });
  return nodeTexts.toArray().join(' ');
}

function handleTexts(texts) {
  return _.map(texts, (text) => {
    const newText = _.cloneDeep(text);
    newText.text = convertToText(newText.text);
    return newText;
  });
}

function findTextInlineRegionId(text) {
  const html = $('<div></div>').html(text);
  return $('inlineChoiceInteraction', html).attr('id');
}

function getInlineRegionId(item) {
  let regionId = _.first(_.keys(_.get(item, 'question.choices')));
  if (regionId) return regionId;

  const texts = _.get(item, 'question.texts');

  _.each(texts, (text) => {
    regionId = findTextInlineRegionId(text.text);
    return !regionId;
  });

  return regionId;
}

export default function movableFillBlank(item) {
  const newItem = baseDeserializer(item);
  const correctAnswer = _.find(item.answers, { genusTypeId: genusTypes.answer.rightAnswer });
  const incorrectAnswer = _.find(item.answers, { genusTypeId: genusTypes.answer.wrongAnswer });

  // We are assuming only one blank, so it will only ever be the first key.
  const inlineRegionId = getInlineRegionId(item);

  newItem.question = {
    ...newItem.question,
    text: convertToText(newItem.question.text),
    texts: handleTexts(newItem.question.texts),
    choices: deserializeChoices(
      _.get(item, `question.multiLanguageChoices["${inlineRegionId}"]`),
      item.answers,
      inlineRegionId
    ),
    inlineRegionId,
    correctFeedback: {
      texts: _.get(correctAnswer, 'feedbacks'),
      text: _.get(correctAnswer, 'feedback.text'),
      answerId: _.get(correctAnswer, 'id'),
      fileIds: _.get(correctAnswer, 'fileIds')
    },
    incorrectFeedback: {
      texts: _.get(incorrectAnswer, 'feedbacks'),
      text: _.get(incorrectAnswer, 'feedback.text'),
      answerId: _.get(incorrectAnswer, 'id'),
      fileIds: _.get(incorrectAnswer, 'fileIds')
    },
  };

  return newItem;
}
