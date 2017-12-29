import movableFillBlank         from './movable_fill_blank';
import genusTypes               from '../../../../constants/genus_types';

describe('movable_fill_blank serializer', () => {
  let item;
  let newItemAttr;
  let result;

  beforeEach(() => {
    item = {
      question: {
        correctFeedback: { answerId: '1' },
        choices: {},
        text: 'Fill in the [_]',
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
      language: '639-2%3AENG%40ISO',
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
    };
    result = movableFillBlank(item, newItemAttr);
  });

  it('handles the serialization of this serializer', () => {
    expect(result.answers[0].feedback.text).toEqual('correctText');
  });

  it('skips the answers when proper data not available', () => {
    newItemAttr.question.choices = null;
    newItemAttr.question.correctFeedback = null;
    result = movableFillBlank(item, newItemAttr);
    expect(result.answers).not.toBeDefined();
  });

  it('adds in incorrectFeedback', () => {
    newItemAttr.question.incorrectFeedback = {
      text: 'not even close to the right answer',
      fileIds: {},
      id: '2',
    };
    result = movableFillBlank(item, newItemAttr);
    expect(result.answers[1].feedback.text).toBe(newItemAttr.question.incorrectFeedback.text);
  });

  it('adds string to question', () => {
    newItemAttr.language = '639-2%3AENG%40ISO';
    newItemAttr.question.text = 'I am a little spec';
    result = movableFillBlank(item, newItemAttr);
    expect(result.question.questionString).toBeDefined();
  });

  it('handles punctuation after the interaction placeholder', () => {
    newItemAttr.question.text = 'Fill in the [_]!!';
    newItemAttr.language = '639-2%3AENG%40ISO';
    result = movableFillBlank(item, newItemAttr);
    expect(result.question.questionString.text).toContain('</inlineChoiceInteraction><p class="other">!!</p>');
  });

  it('handles no punctuation after the interaction placeholder', () => {
    newItemAttr.question.text = 'Fill in the [_]';
    newItemAttr.language = '639-2%3AENG%40ISO';
    result = movableFillBlank(item, newItemAttr);
    expect(result.question.questionString.text).toContain('<p class="other">Fill</p><p class="other">in</p><p class="other">the</p>');
    expect(result.question.questionString.text).toContain('</inlineChoiceInteraction>');
  });
});
