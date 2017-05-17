import _                        from 'lodash';
import baseSerializer           from './base';
import { scrub, languageText }  from '../../serializer_utils';
import genusTypes               from '../../../../constants/genus_types';
import guid                     from '../../../../utils/guid';

function serializeChoices(originalChoices, newChoiceAttributes, language) {
  const choices = _.map(newChoiceAttributes, (updateValues, id) => {
    const choice = originalChoices[id];
    const originalText = _.get(choice, `texts[${language}]`, '');
    const text = _.get(updateValues, 'text', originalText);
    return {
      id,
      text: languageText(text, language),
      delete: _.get(updateValues, 'delete'),
    };
  });

  if (newChoiceAttributes.new) {
    choices.push({
      id: guid(),
      text: languageText('', language),
    });
  }

  return choices;
}

function serializeQuestion(originalQuestion, newQuestionAttributes, language) {
  const newQuestion = {
    multiAnswer: newQuestionAttributes.multiAnswer,
    shuffle: newQuestionAttributes.shuffle,
    timeValue: newQuestionAttributes.timeValue,
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
      ...serializeQuestion(originalItem.question, question, language)
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
