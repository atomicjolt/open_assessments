import _                         from 'lodash';
import baseSerializer            from './base';
import { scrub }                 from '../../serializer_utils';
import genusTypes                from '../../../../constants/genus_types';
import guid                      from '../../../../utils/guid';

//     question: {
//       choices: [
//         {"id": "bbb", "order": 0},
//         {"id", "ccc", "order": 1}
//       ]
//     }
function serializeChoices(originalChoices, newChoiceAttributes) {
  const choices = _.map(originalChoices, (choice) => {
    const updateValues = newChoiceAttributes[choice.id];
    const newOrder = _.get(updateValues, 'order');
    return {
      id: choice.id,
      text: _.get(updateValues, 'text') || choice.text,
      order: _.isNil(newOrder) ? choice.order : newOrder,
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
    shuffle: _.isNil(newQuestionAttributes.shuffle) ? null : newQuestionAttributes.shuffle,
    choices: null,
  };

  if (newQuestionAttributes.choices) {
    newQuestion.choices = serializeChoices(originalQuestion.choices, newQuestionAttributes.choices);
  }

  return scrub(newQuestion);
}

function serializeAnswers(originalChoices, newChoiceAttributes, oldAnswers, correctFeedback) {

  return scrub({
    id: oldAnswers[0].id, // TODO: make sure this works
    genusTypeId: genusTypes.answer.rightAnswer,
    feedback: _.get(correctFeedback, 'text'),
    type: genusTypes.answer.multipleAnswer,
    choiceIds: _.map(originalChoices, 'id'),
    // fileIds: _.get(updateValues, 'fileIds'),  what here?
  });
}

export default function moveableWordSentence(originalItem, newItemAttributes) {
  const newItem = baseSerializer(originalItem, newItemAttributes);

  const { question } = newItemAttributes;
  if (question) {
    newItem.question = {
      ...newItem.question,
      ...serializeQuestion(originalItem.question, question)
    };

    if (question.choices || question.correctFeedback) {
      newItem.answers = serializeAnswers(
        originalItem.question.choices,
        question.choices,
        _.get(originalItem, 'originalItem.answers'),
        _.get(question, 'correctFeedback')
      );
    }
  }
  return scrub(newItem);
}


// Question text gets sent to: {question: {questionString: ""foo""}}"
//
// Word classes are: "noun", "adverb", "other", "adjective", "prep", "verb".
// They should be in a <p class=""noun"">choice word</p>"
//
// {question: {shuffle: true}}
//
// For a certain combination of choice order:
//   {
//     answers: [{
//       choiceIds: [1, 2, 3],
//       genusTypeId: "answer-type%3Aright-answer%40ODL.MIT.EDU",
//       feedback: "yay!",
//       type: "answer-record-type%3Amulti-choice-answer%40ODL.MIT.EDU"
//     }]
//   }
//
// For a certain combination of choice order:
//   {
//     answers: [{
//       choiceIds: [1, 2, 3],
//       genusTypeId: "answer-type%3Aright-answer%40ODL.MIT.EDU",
//       feedback: "yay!",
//       type: "answer-record-type%3Amulti-choice-answer%40ODL.MIT.EDU"
//     }]
//   }
//
// Use the `order` attribute on `choiceIds`, like:
//   {
//     question: {
//       choices: [
//         {"id": "bbb", "order": 0},
//         {"id", "ccc", "order": 1}
//       ]
//     }
//   }
//
// Should be equivalent to deleting the choice:
//   {
//     question: {
//       choices: [{"id": "abc", "delete": true}]
//     }
//   }
//
// {question: {shuffle: true}}"
//
//   {
//     answers: [{
//       choiceIds: [1, 2, 3],
//       genusTypeId: "answer-type%3Aright-answer%40ODL.MIT.EDU",
//       feedback: "yay!",
//       type: "answer-record-type%3Amulti-choice-answer%40ODL.MIT.EDU"}]
//   }

