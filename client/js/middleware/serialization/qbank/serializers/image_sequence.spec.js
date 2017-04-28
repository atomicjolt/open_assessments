import imageSequence          from './image_sequence';
import languages              from '../../../../constants/language_types';
import genusTypes             from '../../../../constants/genus_types';

describe('image_sequence serialization', () => {
  let item;
  let newItemAttr;
  let result;

  beforeEach(() => {
    item = {
      question: {
        correctFeedback: { answerId: '1' },
        choices: {},
      },
      answers: [{
        feedback: { text: '<p>Howdy</p>' },
        genusTypeId: genusTypes.answer.rightAnswer,
        fileIds: {},
        choiceIds: []
      }, {
        feedback: { text: '<p>hiya</p>' },
        genusTypeId: genusTypes.answer.wrongAnswer,
        fileIds: {}
      }],
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
      },
      language: languages.languageTypeId.english,
    };
    result = imageSequence(item, newItemAttr);
  });

  it('handles the serialization', () => {
    expect(result.answers[0].feedback.text).toBe('correctText');
  });

  it('skips the answers when proper data not available', () => {
    newItemAttr.question.choices = null;
    newItemAttr.question.correctFeedback = null;
    result = imageSequence(item, newItemAttr);
    expect(result.answers).not.toBeDefined();
  });
});
