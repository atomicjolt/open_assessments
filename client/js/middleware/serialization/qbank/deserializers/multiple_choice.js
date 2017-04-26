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
      feedback: '',
      fileIds: {},
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
          fileIds: {
            ...newChoices[choice.id].fileIds,
            ...answer.fileIds,
          },
        };
      }
    });
  });
  return newChoices;
}

export default function multipleChoice(item) {
  const newItem = baseDeserializer(item);
  newItem.question = {
    ...newItem.question,
    shuffle: _.get(item, 'question.shuffle'),
    choices: deserializeChoices(_.get(item, 'question.multiLanguageChoices'), item.answers),
  };

  return newItem;
}
