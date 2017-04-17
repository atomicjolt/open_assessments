import _                        from 'lodash';
import baseSerializer           from './base';
import { scrub, languageText }  from '../../serializer_utils';
import genusTypes               from '../../../../constants/genus_types';
import guid                     from '../../../../utils/guid';

function serializeChoices(originalChoices, newChoiceAttributes) {
  const choices = _.map(originalChoices, (choice) => {
    const updateValues = newChoiceAttributes[choice.id];
    return {
      id: choice.id,
      text: _.get(updateValues, 'text', choice.text),
      order: _.get(updateValues, 'order', choice.order),
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

function serializeQuestion(originalQuestion, newQuestionAttributes) {
  const newQuestion = {
    multiAnswer: newQuestionAttributes.multiAnswer,
    shuffle: newQuestionAttributes.shuffle,
    timeValue: newQuestionAttributes.timeValue,
    choices: null,
  };

  if (newQuestionAttributes.choices) {
    newQuestion.choices = serializeChoices(originalQuestion.choices, newQuestionAttributes.choices);
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
      ...serializeQuestion(originalItem.question, question)
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
