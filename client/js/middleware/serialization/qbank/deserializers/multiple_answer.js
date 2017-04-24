import _                          from 'lodash';
import baseDeserializer           from './base';
import genusTypes                 from '../../../../constants/genus_types';
import { deserializeChoiceTexts } from '../../serializer_utils';

function deserializeChoices(choices, answers) {
  const newChoices = {};
  _.forEach(choices, (choice, index) => {
    newChoices[choice.id] = {
      id: choice.id,
      answerId: null,
      text: choice.texts[0].text,
      texts: deserializeChoiceTexts(choice.texts),
      order: index,
      isCorrect: false,
    };
    _.forEach(answers, (answer) => {
      if (_.includes(answer.choiceIds, choice.id)) {
        newChoices[choice.id] = {
          ...newChoices[choice.id],
          feedback: _.get(answer, 'feedback.text'),
          feedbacks: _.get(answer, 'feedbacks'),
          isCorrect: answer.genusTypeId === genusTypes.answer.rightAnswer,
          answerId: answer.id,
        };
      }
    });
  });
  return newChoices;
}


export default function multipleAnswer(item) {
  const newItem = baseDeserializer(item);
  const correctAnswer = _.find(item.answers, { genusTypeId: genusTypes.answer.rightAnswer });
  const incorrectAnswer = _.find(item.answers, { genusTypeId: genusTypes.answer.wrongAnswer });

  newItem.question = {
    ...newItem.question,
    shuffle: _.get(item, 'question.shuffle'),
    choices: deserializeChoices(_.get(item, 'question.multiLanguageChoices'), item.answers),
    correctFeedback: {
      text: _.get(correctAnswer, 'feedback.text'),
      texts: _.get(correctAnswer, 'feedbacks'),
      answerId: _.get(correctAnswer, 'id'),
      fileIds: _.get(correctAnswer, 'fileIds')
    },
    incorrectFeedback: {
      text: _.get(incorrectAnswer, 'feedback.text'),
      texts: _.get(incorrectAnswer, 'feedbacks'),
      answerId: _.get(incorrectAnswer, 'id'),
      fileIds: _.get(incorrectAnswer, 'fileIds')
    },
  };
  return newItem;
}
