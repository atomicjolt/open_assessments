import genusTypes         from '../../../../constants/genus_types';
import imageSequence      from './image_sequence';

describe('imageSequence', () => {

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


  it('should deserialize feedback', () => {
    const expectedFeedback = {
      answerId: '1',
      text: '<p>Howdy</p>',
      fileIds: {},
    };
    const result = imageSequence(item);
    expect(result.question.correctFeedback).toEqual(expectedFeedback);
  });
});
