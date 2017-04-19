import _                         from 'lodash';
import baseSerializer            from './base';
import { scrub, languageText }   from '../../serializer_utils';
import genusTypes                from '../../../../constants/genus_types';
import guid                      from '../../../../utils/guid';

function serializeChoices(originalChoices, newChoiceAttributes, language) {
  // const choices = _(originalChoices)
  //   .filter(choice => {
  //     return _.has(newChoiceAttributes, choice.id) || !_.isUndefined(choice.texts[language])
  //   })
  //   .map((choice) => {
  //     const updateValues = newChoiceAttributes[choice.id];
  //     const newOrder = _.get(updateValues, 'order');
  //     const text = _.get(updateValues, 'text', choice.text);
  //
  //     return {
  //       id: choice.id,
  //       text: languageText(text, language),
  //       order: _.isNil(newOrder) ? choice.order : newOrder,
  //       delete: _.get(updateValues, 'delete'),
  //     };
  //   }).value();

  let choices = []
  if (newChoiceAttributes.new) {
      choices.push({
        id: guid(),
        text: languageText('', newChoiceAttributes.new.language),
        // order: choices.length,
      });
    return choices;
  }

  choices = _(newChoiceAttributes)
    .entries()
    .filter(choice => !_.isUndefined(choice[1].text))
    .map(choice => ({
      id: choice[0],
      text: languageText(choice[1].text, language),
      // order: _.isNil(newOrder) ? choice.order : newOrder,
      delete: choice[1].delete,
    }))
    .value();

  // _.map(_.entries(newChoiceAttributes), choice =>
  //   ({
  //     id: choice[0],
  //     text: languageText(choice[1].text, language),
  //     // order: _.isNil(newOrder) ? choice.order : newOrder,
  //     delete: choice[1].delete,
  //   }));
  return choices;
}

function serializeQuestion(originalQuestion, newQuestionAttributes, language) {
  const newQuestion = {
    shuffle: _.isNil(newQuestionAttributes.shuffle) ? null : newQuestionAttributes.shuffle,
    timeValue: newQuestionAttributes.timeValue,
    choices: null,
  };

  if (newQuestionAttributes.choices) {
    newQuestion.choices = serializeChoices(
      originalQuestion.choices, newQuestionAttributes.choices, language
    );
  }

  return scrub(newQuestion);
}

function correctAnswer(correctId, choiceId, wasCorrect) {
  if (_.isNil(correctId)) {
    return wasCorrect ? genusTypes.answer.rightAnswer : genusTypes.answer.wrongAnswer;
  }
  return correctId === choiceId ? genusTypes.answer.rightAnswer : genusTypes.answer.wrongAnswer;
}

function serializeAnswers(originalChoices, newChoiceAttributes, language) {
  let correctId = null;
  _.forEach(newChoiceAttributes, (choice, key) => {
    if (_.get(choice, 'isCorrect')) { correctId = key; }
  });

  const a = _(newChoiceAttributes)
  .entries()
  .filter(choice => choice[1].id !== 'new' && !_.isUndefined(choice[1].feedback))
  .map((choice) => {
    const original = originalChoices[choice[0]];
    return scrub({
      id: original.answerId,
      genusTypeId: correctAnswer(correctId, original.id, original.isCorrect),
      feedback: languageText(choice[1].feedback, language),
      type: genusTypes.answer.multipleChoice,
      choiceIds: [original.id],
      fileIds: choice[1].fileIds,
      delete: choice[1].delete,
    });
  }).value();
  return a;

  return _.map(originalChoices, (choice) => {
    const updateValues = newChoiceAttributes[choice.id];
    const feedbackText = _.get(updateValues, 'feedback') || choice.feedback;

    return scrub({
      id: choice.answerId,
      genusTypeId: correctAnswer(correctId, choice.id, choice.isCorrect),
      feedback: languageText(feedbackText, language),
      type: genusTypes.answer.multipleChoice,
      choiceIds: [choice.id],
      fileIds: _.get(updateValues, 'fileIds'),
      delete: _.get(updateValues, 'delete'),
    });
  });
}

function killAnswers(answers) {
  return _.map(answers, answer => ({ id: answer.id, delete: true }));
}

export default function multipleChoiceSerializer(originalItem, newItemAttributes) {
  const newItem = baseSerializer(originalItem, newItemAttributes);

  const { question, language } = newItemAttributes;
  if (question) {
    newItem.question = {
      ...newItem.question,
      ...serializeQuestion(originalItem.question, question, language)
    };

    if (question.choices) {
      if (newItemAttributes.type && originalItem.type !== newItemAttributes.type) {
        newItem.answers = killAnswers(_.get(originalItem, 'originalItem.answers'));
      } else {
        newItem.answers = serializeAnswers(
          originalItem.question.choices,
          question.choices,
          language
        );
      }
    }
  }
  return scrub(newItem);
}
