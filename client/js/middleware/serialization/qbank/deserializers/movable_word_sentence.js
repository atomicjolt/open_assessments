import _                                   from 'lodash';
import baseDeserializer                    from './base';
import genusTypes                          from '../../../../constants/genus_types';
import { deserializeMultiLanguageChoices } from '../../serializer_utils';

function deserializeChoices(choices, correctAnswer, incorrectId) {
  const deserializedChoices = deserializeMultiLanguageChoices(choices);
  let count = 0;
  _.each(deserializedChoices, (choice, index) => {
    const answerIndex = correctAnswer.choiceIds.indexOf(choice.id);
    const isCorrect = answerIndex >= 0;
    deserializedChoices[index] = _.merge(
      {},
      choice,
      {
        answerId: isCorrect ? correctAnswer.id : incorrectId,
        order: count,
        answerOrder: isCorrect ? answerIndex : '',
      }
    );
    count += 1;
  });
  return deserializedChoices;
}

export default function movableWordSentence(item) {
  const newItem = baseDeserializer(item);
  const correctAnswer = _.find(item.answers, { genusTypeId: genusTypes.answer.rightAnswer });
  const incorrectAnswer = _.find(item.answers, { genusTypeId: genusTypes.answer.wrongAnswer });
  const choices = _.get(item, 'question.multiLanguageChoices', {});

  newItem.question = {
    ...newItem.question,
    shuffle: _.get(item, 'question.shuffle'),
    choices: deserializeChoices(choices, correctAnswer, _.get(incorrectAnswer, 'id')),
    correctFeedback: {
      texts: _.get(correctAnswer, 'feedbacks'),
      text: _.get(correctAnswer, 'feedback.text'),
      answerId: _.get(correctAnswer, 'id'),
      fileIds: _.get(correctAnswer, 'fileIds')
    },
    incorrectFeedback: {
      texts: _.get(incorrectAnswer, 'feedbacks'),
      text: _.get(incorrectAnswer, 'feedback.text'),
      answerId: _.get(incorrectAnswer, 'id'),
      fileIds: _.get(incorrectAnswer, 'fileIds')
    },
  };

  return newItem;
}
