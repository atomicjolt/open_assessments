// Should be mostly the same and MW sentance, except needs to display audio time limit

import _                  from 'lodash';

import baseDeserializer   from './base';
import { audioLimit }     from '../../../../constants/question_types';


export default function fileUpload(item) {
  const newItem = baseDeserializer(item);
  const timeValue = _.get(item, 'question.timeValue', {
    hours: '00',
    minutes: '00',
    seconds: _.toString(audioLimit)
  });

  newItem.question = {
    ...newItem.question,
    timeValue
  };


  return newItem;
}
