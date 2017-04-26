import genusTypes         from '../../../../constants/genus_types';
import deserializeSandbox from './movable_words_sandbox';
import { languages }      from '../../../../constants/language_types';

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
      question: {
        choices: [
          {
            id: 'id14a6824a-79f2-4c00-ac6a-b41cbb64db45',
            text: '<p class=\'noun\'>the bus</p>'
          }, {
            id: 'id969e920d-6d22-4d06-b4ac-40a821e350c6',
            text: '<p class=\'noun\'>the airport</p>'
          }
        ],
        multiLanguageChoices: [
          {
            id: 'id14a6824a-79f2-4c00-ac6a-b41cbb64db45',
            texts: [{
              text: '<p class=\'noun\'>the bus</p>',
              languageTypeId: languages.languageTypeId.english
            }]
          }, {
            id: 'id969e920d-6d22-4d06-b4ac-40a821e350c6',
            texts: [{
              text: '<p class=\'noun\'>the airport</p>',
              languageTypeId: languages.languageTypeId.english
            }]
          }
        ]
      },
    };
  });


  it('should deserialize choices', () => {
    const expectedChoices = {
      'id14a6824a-79f2-4c00-ac6a-b41cbb64db45': {
        id: 'id14a6824a-79f2-4c00-ac6a-b41cbb64db45',
        text: 'the bus',
        wordType: 'noun',
        texts: {
          [languages.languageTypeId.english] : {
            text: 'the bus',
            wordType: 'noun'
          }
        }
      },
      'id969e920d-6d22-4d06-b4ac-40a821e350c6': {
        id: 'id969e920d-6d22-4d06-b4ac-40a821e350c6',
        text: 'the airport',
        wordType: 'noun',
        texts: {
          [languages.languageTypeId.english] : {
            text: 'the airport',
            wordType: 'noun'
          }
        }
      }
    };

    const result = deserializeSandbox(item);
    expect(result.question.choices).toEqual(expectedChoices);
  });

  it('should deserialize feedback', () => {
    const expectedFeedback = {
      answerId: '1',
      text: '<p>Howdy</p>',
      fileIds: {},
    };

    const result = deserializeSandbox(item);

    expect(result.question.correctFeedback).toEqual(expectedFeedback);
  });
});
