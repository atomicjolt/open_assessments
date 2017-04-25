import movableFillBlank     from './movable_fill_blank';
import genusTypes           from '../../../../constants/genus_types';

describe('movable_fill_blank deserializer', () => {
  let item;
  let result;

  beforeEach(() => {
    item = {
      id: '707',
      bankId:'2525',
      genusTypeId: 'item-genus-type%3Aqti-inline-choice-interaction-mw-fill-in-the-blank%40ODL.MIT.EDU',
      displayName: {
        text: 'this is my name',
      },
      question: {
        correctFeedback: { answerId: '1' },
        choices: {},
        text: {
          text: 'Fill in the [_]',
          langaugeTypeId: '639-2%3AENG%40ISO',
        },
        texts: [],
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
    result = movableFillBlank(item);
  });

  it('deserializes the question', () => {
    expect(result.id).toEqual(item.id);
    expect(result.type).toEqual('movableFillBlank');
  });
});
