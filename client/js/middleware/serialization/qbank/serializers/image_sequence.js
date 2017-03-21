import _                         from 'lodash';
import baseSerializer            from './base';
import { scrub }                 from '../../serializer_utils';
import genusTypes                from '../../../../constants/genus_types';
import guid                      from '../../../../utils/guid';

export function serializeChoices(originalChoices, newChoiceAttributes) {
  const choices = _.map(originalChoices, (choice) => {
    const updateValues = newChoiceAttributes[choice.id];
    const order = _.get(updateValues, 'order', choice.order);
    const orderUpdated = !_.isUndefined(_.get(updateValues, 'order'));

    return scrub({
      id: choice.id,
      text: _.get(updateValues, 'text') || choice.text,
      order,
      delete: _.get(updateValues, 'delete'),
      orderUpdated,
    });
  });

  const updated = _.find(choices, choice => choice.orderUpdated);
  if (updated) {
    const other = _.find(choices, choice => choice.order === updated.order);
    other.order = null;
    delete updated.orderUpdated;
  }

  if (newChoiceAttributes.new) {
    choices.push({
      id: guid(),
      text: newChoiceAttributes.new.text,
      order: choices.length,
    });
  }

  return choices;
}

function serializeQuestion(originalQuestion, newQuestionAttributes) {
  const newQuestion = {
    choices: null,
  };

  if (newQuestionAttributes.choices) {
    newQuestion.choices = serializeChoices(originalQuestion.choices, newQuestionAttributes.choices);
  }

  return scrub(newQuestion);
}

function serializeAnswers(choices, newChoiceAttributes, oldAnswers, correctFeedback, incorrectFeedback) {
  const answers = [];
  const updatedChoices = _.cloneDeep(choices);
  _.forEach(newChoiceAttributes, (choice, id) => {
    updatedChoices[id] = { ...updatedChoices[id], ...choice };
  });

  let correctAnswer = {
    id: _.get(_.find(oldAnswers, { genusTypeId: genusTypes.answer.rightAnswer }), 'id'),
    genusTypeId: genusTypes.answer.rightAnswer,
    feedback: _.get(correctFeedback, 'text'),
    type: genusTypes.answer.multipleAnswer,
    choiceIds: _.map(_.orderBy(_.filter(updatedChoices, choice => choice.answerOrder !== ''), 'answerOrder'), 'id'),
    fileIds: _.get(correctFeedback, 'fileIds'),
  };
  let incorrectAnswer = {
    id: _.get(_.find(oldAnswers, { genusTypeId: genusTypes.answer.wrongAnswer }), 'id'),
    genusTypeId: genusTypes.answer.wrongAnswer,
    feedback: _.get(incorrectFeedback, 'text'),
    type: genusTypes.answer.multipleAnswer,
    choiceIds: _.map(_.filter(updatedChoices, { answerOrder: null }), 'id'),
    fileIds: _.get(incorrectFeedback, 'fileIds'),
  };

  correctAnswer = scrub(correctAnswer);
  incorrectAnswer = scrub(incorrectAnswer);
  answers.push(correctAnswer);
  answers.push(incorrectAnswer);

  return answers;
}

export default function imageSequenceSerializer(originalItem, newItemAttributes) {
  const newItem = baseSerializer(originalItem, newItemAttributes);
  const { question } = newItemAttributes;
  if (question) {
    newItem.question = {
      ...newItem.question,
      ...serializeQuestion(originalItem.question, question)
    };

    if (question.choices || question.correctFeedback || question.incorrectFeedback) {
      newItem.answers = serializeAnswers(
        originalItem.question.choices,
        question.choices,
        _.get(originalItem, 'originalItem.answers'),
        _.get(question, 'correctFeedback'),
        _.get(question, 'incorrectFeedback')
      );
    }
  }
  return scrub(newItem);
}
