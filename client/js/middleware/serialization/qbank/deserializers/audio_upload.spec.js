import audioUpload    from './audio_upload';

describe('audio_upload deserializer', () => {
  it('deserializes the question', () => {
    const item = {
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
    const expectedTimeValue = {
      hours: 1,
      minutes: 70,
      seconds: 100,
    };
    const result = audioUpload(item);
    expect(result.question.timeValue).toEqual(expectedTimeValue);
  });
});
