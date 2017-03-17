import { serializeChoices, serializeAnswers } from './movable_words_sandbox';
import genusTypes from '../../../../constants/genus_types';

describe('MovableWordsSandbox', () => {

  let item;

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
        }
        ]
      }
    };
  });

  it('should serialize choices', () => {
    const expectedChoices = [{
      id: 'id14a6824a-79f2-4c00-ac6a-b41cbb64db45',
      text: '<p class=\'noun\'>the bus</p>'
    }, {
      id: 'id969e920d-6d22-4d06-b4ac-40a821e350c6',
      text: '<p class=\'noun\'>the airport</p>'
    }];

    const result = serializeChoices(item.question.choices);
    expect(result).toEqual(expectedChoices);
  });

  it('should serialize answers', () => {
    const correctFeedback = {
      text: 'correctText',
      fileIds: {},
      id: '1',
    };

    const incorrectFeedback = {
      text: 'incorrectText',
      fileIds: {},
      id: '2',
    };

    const originalItem = {
      question: {
        correctFeedback: { id: '1' },
        incorrectFeedback: { id: '2' }
      }
    };

    const expectedAnswers = [{
      genusTypeId: genusTypes.answer.rightAnswer,
      feedback: correctFeedback.text,
      id: correctFeedback.id,
    }, {
      genusTypeId: genusTypes.answer.wrongAnswer,
      feedback: incorrectFeedback.text,
      id: incorrectFeedback.id,
    }];

    const result = serializeAnswers(correctFeedback, incorrectFeedback, originalItem);
    expect(result).toEqual(expectedAnswers);
  });
});
