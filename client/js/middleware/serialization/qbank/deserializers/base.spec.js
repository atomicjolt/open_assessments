import genusTypes         from '../../../../constants/genus_types';
import base      from './base';

describe('imageSequence', () => {

  let item;

  beforeEach(() => {
    item = {
      id: '1234',
      genusTypeId: 'item-genus-type%3Aqti-order-interaction-object-manipulation%40ODL.MIT.EDU',
      bankId: 'myBank',
      displayName: {
        text: 'displayYourName',
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
        shuffle: 'This is true',
        id: 'questionId',
        fileIds: {},
        texts: {},
        text: {
          text: 'this is your text.text',
          languageTypeId: '639-2%3AENG%40ISO'
        }
      }
    };
  });


  it('should deserialize feedback', () => {
    const newItem = {
      id: '1234',
      originalItem: item,
      type: 'imageSequence',
      bankId: 'myBank',
      assessmentId: null,
      name: 'displayYourName',
      language: 'english',
      question: {
        choices: null,
        correctFeedback: {
          answerId: null,
          text: null,
        },
        fileIds: {},
        id: 'questionId',
        incorrectFeedback: {
          answerId: null,
          text: null,
        },
        text: 'this is your text.text',
        texts: {},
        type: null,
      },
    };
    const result = base(item);
    expect(result).toEqual(newItem);
  });
});
