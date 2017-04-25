import _                from 'lodash';
import genusTypes       from '../../../../constants/genus_types';
import multipleChoice   from './multiple_choice';

describe('multipleChoice', () => {

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
        feedback: { text: '<p>Nice Job</p>' },
        genusTypeId: genusTypes.answer.rightAnswer,
        fileIds: {},
        choiceIds: ['asdf'],
        languageTypeId: 'something cool',
        text: 'not sure what this is supposed to be',
      }, {
        id: '2',
        feedback: { text: '<p>hiya</p>' },
        genusTypeId: genusTypes.answer.wrongAnswer,
        fileIds: {},
        languageTypeId: 'something cool',
        text: 'not sure what this is supposed to be',
      }],
      question: {
        id: 'questionId',
        multiLanguageChoices: [{
          id: 'asdf',
          texts: ['choiceText1', 'meh'],
        }, {
          id: 'qwer',
          texts: ['choiceText2', 'meh2'],
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


  it('should check correctness of isCorrect attribute', () => {
    const result = multipleChoice(item);
    expect(result.question.choices.asdf.isCorrect).toBeTruthy();
    expect(result.question.choices.qwer.isCorrect).toBeFalsy();
  });

  it('should set choice.id correctly', () => {
    const result = multipleChoice(item);
    const setKeys = _.keys(result.question.choices);
    expect(setKeys).toContain('asdf');
    expect(setKeys).toContain('qwer');
  });
});
