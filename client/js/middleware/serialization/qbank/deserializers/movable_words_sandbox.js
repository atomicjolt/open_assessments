import _ from 'lodash';
import $ from 'jquery';

import baseDeserializer                 from './base';
import { audioLimit }                   from '../../../../constants/question_types';
import { createSingleCorrectFeedback }  from '../../serializer_utils';

export function deserializeChoices(choices) {
  return choices.reduce((all, choice) => {
    const nodes = $.parseHTML(choice.text);
    all[choice.id] = {
      id: choice.id,
      text: $(nodes).text(),
      wordType: $(nodes).attr('class'),
    };
    return all;
  }, {});
}

export default function movableWordSandbox(item) {
  const newItem = baseDeserializer(item);
  const timeValue = _.get(item, 'question.timeValue', {
    hours: '00',
    minutes: '00',
    seconds: _.toString(audioLimit)
  });

  const choices = deserializeChoices(_.get(item, 'question.choices', {}));

  newItem.question = {
    ...newItem.question,
    timeValue,
    choices,
    correctFeedback: createSingleCorrectFeedback(item),
  };

  return newItem;
}
