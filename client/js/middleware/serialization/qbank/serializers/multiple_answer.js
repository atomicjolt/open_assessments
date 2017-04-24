import _                        from 'lodash';
import baseSerializer           from './base';
import { scrub, languageText }  from '../../serializer_utils';
import genusTypes               from '../../../../constants/genus_types';
import guid                     from '../../../../utils/guid';

function serializeChoice(originalChoice, newChoiceAttributes, language) {
  const originalText = _.get(originalChoice, `texts[${language}]`, '');
  const updatedChoice = {
    ...originalChoice,
    ...newChoiceAttributes,
    text: newChoiceAttributes.text || originalText
  };

  return {
    id: updatedChoice.id,
    text: languageText(updatedChoice.text, language),
    delete: updatedChoice.delete,
  };
}

function serializeChoices(originalChoices, newChoiceAttributes, language) {
  if (newChoiceAttributes.new) {
    const newChoice = serializeChoice({
      id: guid(),
      text: ''
    }, {}, language);
    return [newChoice];
  }

  return _.map(
    _.toPairs(newChoiceAttributes),
    choice => serializeChoice(originalChoices[choice[0]], choice[1], language)
  );
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

function correctChoiceIds(choices) {
  const result = _(choices)
    .toPairs()
    .filter(choice => choice[1].isCorrect)
    .map(choice => choice[0])
    .value();
  return result;
}

function serializeAnswers(originalChoices, newChoiceAttributes, oldAnswers,
  correctFeedback, incorrectFeedback, language
) {
  const answers = [];
  let correctAnswer = {
    id: _.get(_.find(oldAnswers, { genusTypeId: genusTypes.answer.rightAnswer }), 'id'),
    genusTypeId: genusTypes.answer.rightAnswer,
    feedback: languageText(_.get(correctFeedback, 'text'), language),
    type: genusTypes.answer.multipleAnswer,
    choiceIds: [],
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

  const allChoices = _.merge(
    {},
    originalChoices,
    newChoiceAttributes,
  );

  correctAnswer.choiceIds.push(...correctChoiceIds(allChoices));

  correctAnswer = scrub(correctAnswer, ['choiceIds']);
  incorrectAnswer = scrub(incorrectAnswer, ['choiceIds']);
  answers.push(correctAnswer);
  answers.push(incorrectAnswer);

  return answers;
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
    if (question.choices || question.correctFeedback || question.incorrectFeedback) {
      if (newItemAttributes.type && originalItem.type !== newItemAttributes.type) {
        newItem.answers = killAnswers(_.get(originalItem, 'originalItem.answers'));
      } else {
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
  }

  return scrub(newItem);
}
