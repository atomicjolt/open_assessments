import _                         from 'lodash';
import baseSerializer            from './base';
import { scrub, languageText }   from '../../serializer_utils';
import genusTypes                from '../../../../constants/genus_types';
import guid                      from '../../../../utils/guid';
import { languageText as findLanguageText } from '../../../../utils/utils';

function serializeChoices(originalChoices, newChoiceAttributes, language) {
  const choices = [];
  if (newChoiceAttributes.new) {
    choices.push({
      id: guid(),
      text: languageText('', newChoiceAttributes.new.language),
    });
    return choices;
  }

  const serializedChoices = _(newChoiceAttributes)
    .entries()
    .filter(choice => choice[0] !== 'new' && !_.isUndefined(choice[1].text))
    .map(choice => ({
      id: choice[0],
      text: languageText(choice[1].text, language),
      delete: choice[1].delete,
    }))
    .value();

  return choices.concat(serializedChoices);
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

  const serializedAnswers = _(newChoiceAttributes)
  .entries()
  .filter(choice =>
    choice[1].id !== 'new' &&
    (!_.isUndefined(choice[1].feedback) || !_.isUndefined(choice[1].isCorrect))
  )
  .map((choice) => {
    const original = originalChoices[choice[0]];
    const text = choice[1].feedback || findLanguageText(original.feedbacks, language);
    return scrub({
      id: original.answerId,
      genusTypeId: correctAnswer(correctId, original.id, original.isCorrect),
      feedback: languageText(text, language),
      type: genusTypes.answer.multipleChoice,
      choiceIds: [original.id],
      fileIds: choice[1].fileIds,
      delete: choice[1].delete,
    });
  })
  .value();
  return serializedAnswers;
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
