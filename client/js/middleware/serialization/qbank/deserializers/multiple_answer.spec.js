import genusTypes       from '../../../../constants/genus_types';
import multipleAnswer   from './multiple_answer';

describe('multipleAnswer', () => {

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
        feedback: { text: 'Nice Job' },
        feedbacks: 'Doing great',
        genusTypeId: genusTypes.answer.rightAnswer,
        fileIds: {},
        choiceIds: ['asdf']
      }, {
        id: '2',
        feedback: { text: 'Maybe study more' },
        feedbacks: 'Need to work harder',
        genusTypeId: genusTypes.answer.wrongAnswer,
        fileIds: {}
      }],
      question: {
        id: 'questionId',
        choices: [{
          id: 'asdf',
          text: 'choiceText1',
        }, {
          id: 'qwer',
          text: 'choiceText2'
        }],
        fileIds: {},
        shuffle: false,
        texts: {},
        text: {
          text: 'this is your text.text',
        }
      }
    };
  });


  it('should check correctness of feedbacks', () => {
    const result = multipleAnswer(item);
    expect(result.question.correctFeedback.text).toBe('Nice Job');
    expect(result.question.incorrectFeedback.text).toBe('Maybe study more');
  });

  it('should check answer Ids', () => {
    const result = multipleAnswer(item);
    expect(result.question.correctFeedback.answerId).toBe('1');
    expect(result.question.incorrectFeedback.answerId).toBe('2');
  });
});
