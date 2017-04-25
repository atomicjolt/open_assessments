import _                         from 'lodash';
import baseSerializer            from './base';
import { scrub, languageText }   from '../../serializer_utils';
import genusTypes                from '../../../../constants/genus_types';
import guid                      from '../../../../utils/guid';

function serializeChoices(originalChoices, newChoiceAttributes, language) {
  // const choices = _.map(originalChoices, (choice) => {
  //   const updateValues = newChoiceAttributes[choice.id];
  //   const newOrder = _.get(updateValues, 'order');
  //   const labelText = _.get(updateValues, 'labelText', choice.labelText);
  //   const imageSrc = choice.text;
  //   const imageAlt = choice.altText;
  //   const text = `<p>${labelText}</p><img src='${imageSrc}' alt='${imageAlt}'>`;
  //   debugger;
  //   return {
  //     id: choice.id,
  //     text,
  //     order: _.isNil(newOrder) ? choice.order : newOrder,
  //     delete: _.get(updateValues, 'delete'),
  //   };
  // });

  // const choices = [];

  const choices = _(newChoiceAttributes)
    .toPairs()
    .filter(choice => !_.isUndefined(originalChoices[choice[0]]))
    .map((choice) => {
      const original = originalChoices[choice[0]];
      const labelText = _.get(choice, 'text', original.labelText);
      const imageSrc = _.get(original, `texts[${language}].text`, '');
      const imageAlt = _.get(original, `texts[${language}].altText`, '');
      const text = `<p>${labelText}</p><img src='${imageSrc}' alt='${imageAlt}'>`;
      return {
        id: original.id,
        text,
        delete: choice.delete,
      };
    })
    .value();

  if (newChoiceAttributes.new) {
    choices.push({
      id: guid(),
      text: `<p></p><img src='${newChoiceAttributes.new.text}' alt='${newChoiceAttributes.new.altText}'>`,
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
  debugger;
  return scrub(newItem);
}
