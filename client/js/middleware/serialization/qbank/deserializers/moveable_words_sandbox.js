// Should be mostly the same and MW sentance, except needs to display audio time limit

import _ from 'lodash';
import $ from 'jquery';

import baseDeserializer from './base';
import genusTypes                from '../../../../constants/genus_types';
import { audioLimit } from '../../../../constants/question_types';


export function deserializeChoices(choices) {
  return choices.reduce((all, choice) => {
    const nodes = $.parseHTML(choice.text);
    all[choice.id] = {
      id: choice.id,
      text: _.get(nodes, '[0].innerText', ''),
      wordType: _.get(nodes, '[0].className', ''),
    };
    return all;
  }, {});
}

export function deserializeFeedback(answers) {
  return _.reduce(answers, (feedbacks, feedback) => {
    if (feedback.genusTypeId === genusTypes.answer.rightAnswer) {
      feedbacks.correctFeedback = {
        text: feedback.feedback.text,
        fileIds: feedback.fileIds,
      };
    } else if (feedback.genusTypeId === genusTypes.answer.wrongAnswer) {
      feedbacks.incorrectFeedback = {
        text: feedback.feedback.text,
        fileIds: feedback.fileIds,
      };
    }
    return feedbacks;
  }, {});
}

export default function fileUpload(item) {
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
    choices
  };

  //TODO deserialize feedback {text: '', fileIds: {}}

  return newItem;
}
