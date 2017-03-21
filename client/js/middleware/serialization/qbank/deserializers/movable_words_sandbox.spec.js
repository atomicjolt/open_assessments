import genusTypes from '../../../../constants/genus_types';
import { deserializeChoices, deserializeFeedback } from './movable_words_sandbox';

describe('MovableWordsSandbox', () => {

  let item;

  beforeEach(() => {
    item = {
      answers: [{
        id: '1',
        feedback: { text: '<p>Howdy</p>' },
        genusTypeId: genusTypes.answer.rightAnswer,
        fileIds: {}
      }, {
        id: '2',
        feedback: { text: '<p>hiya</p>' },
        genusTypeId: genusTypes.answer.wrongAnswer,
        fileIds: {}
      }],
      choices: [
        {
          id: 'id14a6824a-79f2-4c00-ac6a-b41cbb64db45',
          text: '<p class=\'noun\'>the bus</p>'
        }, {
          id: 'id969e920d-6d22-4d06-b4ac-40a821e350c6',
          text: '<p class=\'noun\'>the airport</p>'
        }]
    };
  });


  it('should deserialize choices', () => {
    const expectedChoices = {
      'id14a6824a-79f2-4c00-ac6a-b41cbb64db45': {
        id: 'id14a6824a-79f2-4c00-ac6a-b41cbb64db45',
        text: 'the bus',
        wordType: 'noun',
      },
      'id969e920d-6d22-4d06-b4ac-40a821e350c6': {
        id: 'id969e920d-6d22-4d06-b4ac-40a821e350c6',
        text: 'the airport',
        wordType: 'noun',
      }
    };

    const result = deserializeChoices(item.choices);
    expect(result).toEqual(expectedChoices);
  });

  it('should deserialize feedback', () => {
    const expectedFeedback = {
      correctFeedback: {
        id: '1',
        text: '<p>Howdy</p>',
        fileIds: {},
      },
      incorrectFeedback: {
        id: '2',
        text: '<p>hiya</p>',
        fileIds: {},
      },
    };

    const result = deserializeFeedback(item.answers);

    expect(result).toEqual(expectedFeedback);
  });
});
