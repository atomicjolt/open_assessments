import _                        from 'lodash';
import baseSerializer           from './base';
import { scrub, languageText }  from '../../serializer_utils';
import genusTypes               from '../../../../constants/genus_types';
import guid                     from '../../../../utils/guid';

function serializeChoices(newChoiceAttributes, language) {
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

function serializeQuestion(newQuestionAttributes, language) {
  const newQuestion = {
    multiAnswer: newQuestionAttributes.multiAnswer,
    shuffle: newQuestionAttributes.shuffle,
    timeValue: newQuestionAttributes.timeValue,
    choices: null,
  };

  if (newQuestionAttributes.choices) {
    newQuestion.choices = serializeChoices(newQuestionAttributes.choices, language);
  }

  return scrub(newQuestion);
}

function serializeAnswers(originalChoices, oldAnswers, feedback) {
  return [{
    id: _.get(_.find(oldAnswers, { genusTypeId: genusTypes.answer.rightAnswer }), 'id'),
    genusTypeId: genusTypes.answer.rightAnswer,
    feedback,
    type: genusTypes.answer.multipleAnswer,
    choiceIds: _.map(originalChoices, 'id'),
  }];
}

function killAnswers(answers) {
  return _.map(answers, answer => ({ id: answer.id, delete: true }));
}


export default function surveySerializer(originalItem, newItemAttributes) {
  const newItem = baseSerializer(originalItem, newItemAttributes);

  const { question, language } = newItemAttributes;
  if (question) {
    newItem.question = {
      ...newItem.question,
      ...serializeQuestion(question, language)
    };
    if (question.choices || question.correctFeedback) {
      if (newItemAttributes.type && originalItem.type !== newItemAttributes.type) {
        newItem.answers = killAnswers(_.get(originalItem, 'originalItem.answers'));
      } else {
        newItem.answers = serializeAnswers(
          originalItem.question.choices,
          _.get(originalItem, 'originalItem.answers'),
          languageText(_.get(question, 'correctFeedback.text'), language),
        );
      }
    }
  }

  return scrub(newItem);
}
