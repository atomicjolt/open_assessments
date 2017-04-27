import _ from 'lodash';
import $ from 'jquery';

import baseDeserializer                    from './base';
import { audioLimit }                      from '../../../../constants/question_types';
import {
  createSingleCorrectFeedback,
  deserializeMultiLanguageChoices
}                                          from '../../serializer_utils';


function parseChoiceText(text) {
  const nodes = $.parseHTML(text);
  return {
    text: $(nodes).text(),
    wordType: $(nodes).attr('class'),
  };
}

function deserializeChoice(choice) {
  return { ...parseChoiceText(choice.text), id: choice.id };
}

export function deserializeChoices(choices) {
  const all = {};
  _.each(choices, (choice) => {
    all[choice.id] = deserializeChoice(choice);
  });
  return all;
}

export default function movableWordSandbox(item) {
  const newItem = baseDeserializer(item);
  const timeValue = _.get(item, 'question.timeValue', {
    hours: '00',
    minutes: '00',
    seconds: _.toString(audioLimit)
  });

  const choices = deserializeMultiLanguageChoices(_.get(item, 'question.multiLanguageChoices', {}));

  newItem.question = {
    ...newItem.question,
    timeValue,
    choices,
    correctFeedback: createSingleCorrectFeedback(item),
  };

  return newItem;
}
