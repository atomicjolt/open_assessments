import genusTypes         from '../../../../constants/genus_types';
import shortAnswer      from './short_answer';

describe('shortAnswer', () => {

  let item;

  beforeEach(() => {
    item = {
      id: '1234',
      genusTypeId: 'item-genus-type%3Aqti-order-interaction-object-manipulation%40ODL.MIT.EDU',
      bankId: 'myBank',
      displayName: {
        text: 'displayYourText',
      },
      answers: [{
        id: '1',
        feedback: { text: '<p>Howdy</p>' },
        genusTypeId: genusTypes.answer.rightAnswer,
        fileIds: {},
        choiceIds: []
      }, {
        id: '2',
        feedback: { text: '<p>hiya</p>' },
        genusTypeId: genusTypes.answer.wrongAnswer,
        fileIds: {}
      }],
      question: {
        maxStrings: '100',
        expectedLength: '11',
        expectedLines: '2',
        shuffle: 'This is true',
        id: 'questionId',
        fileIds: {},
        texts: {},
        text: {
          text: 'this is your text.text',
        }
      }
    };
  });


  it('should deserialize maxStrings and expectedLength', () => {
    const result = shortAnswer(item);
    expect(result.question.maxStrings).toBe('100');
    expect(result.question.expectedLength).toBe('11');
    expect(result.question.expectedLines).toBe('2');
  });
});
