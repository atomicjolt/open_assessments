import _                         from 'lodash';
import baseSerializer            from './base';
import { scrub, languageText }   from '../../serializer_utils';
import genusTypes                from '../../../../constants/genus_types';
import guid                      from '../../../../utils/guid';

function serializeChoices(originalChoices, newChoiceAttributes, language) {
  const choices = _.map(originalChoices, (choice) => {
    const updateValues = newChoiceAttributes[choice.id];
    const newOrder = _.get(updateValues, 'order');
    const originalLabelText = _.get(choice, `texts[${language}].labelText`, '');
    const originalImageSrc = _.get(choice, `texts[${language}].text`, '');
    const originalAltText = _.get(choice, `texts[${language}].altText`, '');

    const imageSrc = _.get(updateValues, 'text', originalImageSrc);
    const labelText = _.get(updateValues, 'labelText', originalLabelText);
    const imageAlt = _.get(updateValues, 'altText', originalAltText);
    const text = `<p>${labelText}</p><img src='${imageSrc}' alt='${imageAlt}'>`;

    return {
      id: choice.id,
      text: languageText(text, language),
      order: _.isNil(newOrder) ? choice.order : newOrder,
      delete: _.get(updateValues, 'delete'),
    };
  });

  if (newChoiceAttributes.new) {
    const text = `<p></p><img src='${newChoiceAttributes.new.text}' alt='${newChoiceAttributes.new.altText}'>`;

    choices.push({
      id: guid(),
      text: languageText(text, language),
      order: choices.length
    });
  }

  return choices;
}

function serializeQuestion(originalQuestion, newQuestionAttributes, language) {
  const newQuestion = {
    choices: null,
  };
  if (newQuestionAttributes.choices) {
    newQuestion.choices = serializeChoices(
      originalQuestion.choices,
      newQuestionAttributes.choices,
      language
    );
  }

  return scrub(newQuestion);
}

function serializeAnswers(choices, newChoiceAttributes, oldAnswers,
  correctFeedback, incorrectFeedback, language) {

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
    choiceIds: _.map(_.orderBy(_.filter(updatedChoices, choice => choice.order !== ''), 'order'), 'id'),
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
  incorrectAnswer = scrub(incorrectAnswer);
  incorrectAnswer.choiceIds = [];
  answers.push(correctAnswer);
  answers.push(incorrectAnswer);

  return answers;
}

export default function imageSequenceSerializer(originalItem, newItemAttributes) {
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
