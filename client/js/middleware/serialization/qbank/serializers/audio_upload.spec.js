import audioUpload    from './audio_upload';

describe('audio_upload serializer', () => {
  let result;
  let item;
  let newAttributes;

  beforeEach(() => {
    item = {
      question: {
        id: 7,
        type: '',
        name: 'something',
      }
    };
    newAttributes = {
      id: 7,
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
    result = audioUpload(item, newAttributes);
    expect(result.answers[0].genusTypeId).toContain('MIT.EDU');
  });

  it('returns a scrubbed new item from second if statement', () => {
    newAttributes.question.correctFeedback = null;
    result = audioUpload(item, newAttributes);
    expect(result.question.timeValue.seconds).toBe(100);
  });
});
