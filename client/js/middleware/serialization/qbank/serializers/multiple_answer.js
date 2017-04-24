import _                        from 'lodash';
import baseSerializer           from './base';
import { scrub, languageText }  from '../../serializer_utils';
import genusTypes               from '../../../../constants/genus_types';
import guid                     from '../../../../utils/guid';

function serializeChoice(choice, language) {
  debugger
  return {
    id: choice.id,
    text: languageText(choice.text, language),
    delete: choice.delete,
  };
}

function serializeChoices(originalChoices, newChoiceAttributes, language) {
  // const choices = _.map(originalChoices, (choice) => {
  //   const updateValues = newChoiceAttributes[choice.id];
  //   const newOrder = _.get(updateValues, 'order');
  //
  //   const choiceText = _.get(updateValues, 'text') || choice.text;
  //   return {
  //     id: choice.id,
  //     text: languageText(choiceText, language),
  //     order: _.isNil(newOrder) ? choice.order : newOrder,
  //     delete: _.get(updateValues, 'delete'),
  //   };
  // });


  if (newChoiceAttributes.new) {
    const newChoices = [
      serializeChoice({
        id: guid(),
        text: ''
      })
    ];
    // debugger;
    return newChoices;
  }

  // const choicePairs = ;
  const choices = _.map(
    _.toPairs(newChoiceAttributes),
    (choice) => {
      const mergedChoice = { ...originalChoices[choice[0]], ...choice[1] };
      return serializeChoice(mergedChoice, language);
    }
  );
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

  const allChoices = {
    ...originalChoices,
    ...newChoiceAttributes,
  };
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
