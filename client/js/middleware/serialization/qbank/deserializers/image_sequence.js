import _                  from 'lodash';
import $                  from 'jquery';
import baseDeserializer   from './base';
import genusTypes         from '../../../../constants/genus_types';


function deserializeChoices(choices, correctAnswer, incorrectId) {
  const newChoices = {};
  _.forEach(choices, (choice, index) => {
    const answerIndex = correctAnswer.choiceIds.indexOf(choice.id);
    const isCorrect = answerIndex >= 0;
    const nodes = $('<div>').html(choice.text);
    const image = $('img', nodes);
    const label = $('p', nodes);

    newChoices[choice.id] = {
      id: choice.id,
      answerId: isCorrect ? correctAnswer.id : incorrectId,
      text: image ? image.attr('src') : '',
      altText: image ? image.attr('alt') : '',
      order: index + 1,
      labelText: label ? label.text() : '',
    };
  });

  return newChoices;
}

export default function imageSequence(item) {
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
