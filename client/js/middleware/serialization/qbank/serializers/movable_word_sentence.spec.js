import movableWordSentence          from './movable_word_sentence';
import genusTypes                   from '../../../../constants/genus_types';
import { languages }                from '../../../../constants/language_types';

describe('movable_word_sentence serializer', () => {
  let item;
  let newItemAttr;
  let result;

  beforeEach(() => {
    item = {
      question: {
        correctFeedback: { answerId: '1' },
        choices: [{
          id: 'id14a6824a-79f2-4c00-ac6a-b41cbb64db45',
          texts: {
            '639-2%3AENG%40ISO': {
              text: 'the bus',
              wordType: 'noun'
            }
          }
        },
        {
          id: 'id969e920d-6d22-4d06-b4ac-40a821e350c6',
          texts: {
            '639-2%3AENG%40ISO': {
              text: 'the airport',
              wordType: 'noun'
            }
          }
        }],
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
    newItemAttr = {
      question: {
        choices: [{},
        {}],
        correctFeedback: {
          text: 'correctText',
          fileIds: {},
          id: '1',
        },
      },
      language: '639-2%3AENG%40ISO',
    };
    result = movableWordSentence(item, newItemAttr);
  });

  it('should serialize the choices', () => {
    const expectedChoices = [
      {
        id: 'id14a6824a-79f2-4c00-ac6a-b41cbb64db45',
        text: {
          formatTypeId: languages.formatTypeId,
          languageTypeId: languages.languageTypeId.english,
          scriptTypeId: languages.scriptTypeId.english,
          text: '<p class="noun">the bus</p>',
        },
        order: undefined,
        delete: undefined,
      },
      {
        id: 'id969e920d-6d22-4d06-b4ac-40a821e350c6',
        text: {
          formatTypeId: languages.formatTypeId,
          languageTypeId: languages.languageTypeId.english,
          scriptTypeId: languages.scriptTypeId.english,
          text: '<p class="noun">the airport</p>',
        },
        order: undefined,
        delete: undefined,
      },
    ];
    expect(result.question.choices).toEqual(expectedChoices);
  });

  it('should serialize the answers', () => {
    const expectedAnswers = [
      {
        genusTypeId: 'answer-type%3Aright-answer%40ODL.MIT.EDU',
        feedback: {
          text: 'correctText',
          languageTypeId: languages.languageTypeId.english,
          formatTypeId: 'TextFormats%3APLAIN%40okapia.net',
          scriptTypeId: languages.scriptTypeId.english,
        },
        type: 'answer-record-type%3Amulti-choice-answer%40ODL.MIT.EDU'
      },
      {
        genusTypeId: 'answer-type%3Awrong-answer%40ODL.MIT.EDU',
        type: 'answer-record-type%3Amulti-choice-answer%40ODL.MIT.EDU',
        choiceIds: []
      }
    ];
    expect(result.answers).toEqual(expectedAnswers);
  });
});
