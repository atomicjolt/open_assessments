import fileUpload    from './file_upload';

describe('file_upload deserializer', () => {
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
      answers: [{
        feedback: {
          text: 'something witty',
          texts: [],
        },
        id: '7',
        fileIds: {},
      }],
    };
    const result = fileUpload(item);
    expect(result.question.correctFeedback.text).toEqual('something witty');
  });
});
