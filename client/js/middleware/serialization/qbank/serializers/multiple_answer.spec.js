
import multipleAnswer    from './multiple_answer';
import genusTypes         from '../../../../constants/genus_types';

describe('multipleAnswer serializer', () => {
  let item;
  let newItem;
  let result;

  beforeEach(() => {
    item = {
      id: 'item01',
      type: 'multipleAnswer',
      assessmentId: 'assessment01',
      bankId: 'bank01',
      language: 'english',
      name: 'ItemName',
      question: {
        id: 'question01',
        text: 'Answer this question',
        type: 'multipleAnswer',
        shuffle: 'true',
        choices: {
          choice01: {
            answerId: 'answer01',
            feedback: '',
            fileIds: {},
            id: 'choice01',
            isCorrect: false,
            order: 1,
            text: '<p>Steak</p>',
          },
          choice02: {
            answerId: 'answer02',
            feedback: '',
            fileIds: {},
            id: 'choice02',
            isCorrect: true,
            order: 2,
            text: '<p>bacon</p>',
          },
          choice03: {
            answerId: null,
            feedback: 'answer03',
            fileIds: {},
            id: 'choice03',
            isCorrect: false,
            order: 3,
            text: '<p>salad</p>',
          },
        },
        correctFeedback: {
          answerId: 'answer01',
          text: 'Good Job',
          fileIds: {},
        },
        fileIds: {},
        texts: [],
        visibleZones: true,
      },
      originalItem: {},
    };

    newItem = {
      id: 'item01',
      question: {
        choices: {
          choice01: {
            answerId: 'answer01',
            feedback: '',
            fileIds: {},
            id: 'choice01',
            isCorrect: false,
            order: 1,
            text: '<p>Steak</p>',
          },
          choice02: {
            answerId: 'answer02',
            feedback: '',
            fileIds: {},
            id: 'choice02',
            isCorrect: true,
            order: 2,
            text: '<p>bacon</p>',
          },
          choice03: {
            answerId: null,
            feedback: 'answer03',
            fileIds: {},
            id: 'choice03',
            isCorrect: false,
            order: 3,
            text: '<p>salad</p>',
          },
        }
      },
    };


    result = multipleAnswer(item, newItem);
  });

  it('accepts original item and newItemAttr', () => {
    expect(result.name).toBe('ItemName');
  });

  it('question attributes correct', () => {
    expect(result.question.id).toBe('question01');
    expect(result.question.genusTypeId).toBe(genusTypes.question.multipleAnswer);
  });

  it('choices should be sent up', () => {
    expect(result.question.choices).toBeDefined();
    expect(result.question.choices.length).toBe(3);
  });

  it('answers', () => {
    newItem = {
      id: 'item01',
      question: {
        choices: {
          id: 'choice01',
          answerId: 'answer01',
        }
      },
    };

    result = multipleAnswer(item, newItem);
    expect(result.answers.length).toBe(2);
    expect(result.answers[0].genusTypeId).toBe(genusTypes.answer.rightAnswer);
    expect(result.answers[1].genusTypeId).toBe(genusTypes.answer.wrongAnswer);
    expect(result.answers[0].choiceIds).toContain('choice02');
  });
});
