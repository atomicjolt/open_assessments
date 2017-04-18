import React          from 'react';
import AudioUpload    from './audio_upload';
import _              from 'lodash';

describe('audio_upload serializer', () => {
  let result;
  let item;
  let newAttributes;

  beforeEach(() => {
    item = {
      id: '7',
      name: 'something',
    };
    newAttributes = {
      question: {
        correctFeedback: 'Spec Feedback',
        timeValue: {
          hours: 1,
          minutes: 70,
          seconds: 100,
        },
      },
      answers: {},  
    };
  });

  it('returns a scrubbed new item from first if statement', () => {
    result = AudioUpload(item, newAttributes);
    expect(result.answers[0].genusTypeId).toContain('MIT.EDU');
  });

  it('returns a scrubbed new item from second if statement', () => {
    newAttributes.question.correctFeedback = null;
    const get = _.get(newAttributes, 'question.timeValue', {})
    console.log(get)
    result = AudioUpload(item, newAttributes);
    console.log(item);
    console.log(newAttributes);
    const empty = !_.isEmpty(get)
    console.log(empty)
    console.log(result);
  });
});
