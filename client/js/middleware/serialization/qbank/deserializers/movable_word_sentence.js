import _                       from 'lodash';
import baseDeserializer        from './base';
import genusTypes              from '../../../../constants/genus_types';
import { parseChoiceText,
         parseChoiceWordType } from '../../serializer_utils';

function deserializeChoices(choices, correctAnswer, incorrectId) {
  const newChoices = {};
  _.forEach(choices, (choice, index) => {
    const answerIndex = correctAnswer.choiceIds.indexOf(choice.id);
    const isCorrect = answerIndex >= 0;
    newChoices[choice.id] = {
      id: choice.id,
      answerId: isCorrect ? correctAnswer.id : incorrectId,
      text: parseChoiceText(choice.text),
      wordType: parseChoiceWordType(choice.text),
      order: index,
      answerOrder: isCorrect ? answerIndex : '',
    };
  });
  return newChoices;
}


export default function movableWordSentence(item) {
  const newItem = baseDeserializer(item);
  const correctAnswer = _.find(item.answers, { genusTypeId: genusTypes.answer.rightAnswer });
  const incorrectAnswer = _.find(item.answers, { genusTypeId: genusTypes.answer.wrongAnswer });

  newItem.question = {
    ...newItem.question,
    shuffle: _.get(item, 'question.shuffle'),
    choices: deserializeChoices(_.get(item, 'question.choices'), correctAnswer, _.get(incorrectAnswer, 'id')),
    correctFeedback: {
      text: _.get(correctAnswer, 'feedback.text'),
      answerId: _.get(correctAnswer, 'id'),
      fileIds: _.get(correctAnswer, 'fileIds')
    },
    incorrectFeedback: {
      text: _.get(incorrectAnswer, 'feedback.text'),
      answerId: _.get(incorrectAnswer, 'id'),
      fileIds: _.get(incorrectAnswer, 'fileIds')
    },
  };

  return newItem;
}
