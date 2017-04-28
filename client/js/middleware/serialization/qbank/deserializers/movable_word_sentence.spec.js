import genusTypes       from '../../../../constants/genus_types';
import movableWordSentence   from './movable_word_sentence';

describe('movableWordSentence', () => {

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
        multiLanguageChoices: [{
          id: 'asdf',
          text: 'choiceText1',
          texts: {
            '639-2%3AENG%40ISO': {
              text: 'choiceText1',
              languageTypeId: '639-2%3AENG%40ISO',
              wordType: 'noun'
            }
          }
        }, {
          id: 'qwer',
          text: 'choiceText2',
          texts: {
            '639-2%3AENG%40ISO': {
              text: 'choiceText2',
              languageTypeId: '639-2%3AENG%40ISO',
              wordType: 'noun'
            }
          }
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


  it('should check order', () => {
    const result = movableWordSentence(item);
    expect(result.question.choices.asdf.order).toBe(0);
    expect(result.question.choices.qwer.order).toBe(1);
  });

  it('should check text', () => {
    const result = movableWordSentence(item);
    expect(result.question.choices.asdf.texts['639-2%3AENG%40ISO'].text).toBe('choiceText1');
    expect(result.question.choices.qwer.texts['639-2%3AENG%40ISO'].text).toBe('choiceText2');
  });

  it('should check order', () => {
    const result = movableWordSentence(item);
    expect(result.question.choices.asdf.answerId).toBe('1');
    expect(result.question.choices.qwer.answerId).toBe('2');
  });

});
