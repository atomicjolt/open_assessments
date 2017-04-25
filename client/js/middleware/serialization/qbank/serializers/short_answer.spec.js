import shortAnswer      from './short_answer';
import languages        from '../../../../constants/language_types';

describe('short answer serializer', () => {
  let item;
  let newItemAttr;
  let result;

  beforeEach(() => {
    item = {
      question: {
        choices: [{
          id: 'id14a6824a-79f2-4c00-ac6a-b41cbb64db45',
          text: 'the bus',
          wordType: 'noun',
        },
        {
          id: 'id969e920d-6d22-4d06-b4ac-40a821e350c6',
          text: 'the airport',
          wordType: 'noun',
        }],
        correctFeedback: {
          text: 'correctText',
          fileIds: {},
          id: '1',
        },
      },
      language: languages.languageTypeId.english,
    };
    newItemAttr = {
      question: {
        choices: [{},
        {}],
        correctFeedback: {
          text: 'correctText',
          fileIds: {},
          id: '1',
        },
        expectedLines: 15,
        expectedLength: 200,
        maxStrings: 20,
      },
    };
    result = shortAnswer(item, newItemAttr);
  });

  it('scrubs the question and answer', () => {
    expect(result.answers[0].feedback.text).toEqual(newItemAttr.question.correctFeedback.text);
    expect(result.question.expectedLength).toEqual(newItemAttr.question.expectedLength);
  });
});
