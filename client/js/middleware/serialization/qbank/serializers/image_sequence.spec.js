import { serializeChoices } from './image_sequence';
import genusTypes from '../../../../constants/genus_types';

fdescribe('ImageSequence', () => {

  let item;

  beforeEach(() => {
    item = {
      question: {
        choices: [{
          id: 'choice_1',
          answerId: 'answer_1',
          text: 'Howdy',
          order: 0,
          answerOrder: null,
        }, {
          id: 'choice_2',
          answerId: 'answer_1',
          text: 'Hello',
          order: 2,
          answerOrder: null,
        }, {
          id: 'choice_3',
          answerId: 'answer_1',
          text: 'Hola',
          order: 1,
          answerOrder: null,
        }
        ]
      }
    };
  });

  it('should serialize choices', () => {
    const expectedChoices = [{
      id: 'choice_1',
      text: 'Howdy'
    }, {
      id: 'choice_3',
      text: 'Hola'
    }, {
      id: 'choice_2',
      text: 'Hello'
    }];

    const result = serializeChoices(item.question.choices, {});
    expect(result).toEqual(expectedChoices);
  });

  it('should update choices', () => {
    const expectedChoices = [{
      id: 'choice_1',
      text: 'Howdy'
    }, {
      id: 'choice_2',
      text: 'Hello'
    }, {
      id: 'choice_3',
      text: 'Hola'
    }];

    const result = serializeChoices(item.question.choices, {
      choice_3: {
        id: 'choice_3',
        order: 2,
      },
      choice_2: {
        id: 'choice_2',
        order: 1,
      },
      choice_1: {
        id: 'choice_1',
        order: 0,
      }
    });
    expect(result).toEqual(expectedChoices);
  });

  it('should update single choice', () => {
    const expectedChoices = [{
      id: 'choice_1',
      text: 'Howdy'
    }, {
      id: 'choice_2',
      text: 'Hello'
    }, {
      id: 'choice_3',
      text: 'Hola'
    }];

    const result = serializeChoices(item.question.choices, {
      choice_2: {
        id: 'choice_2',
        order: 1,
      },
    });

    expect(result).toEqual(expectedChoices);
  });

  // it('should serialize answers', () => {
  //   const correctFeedback = {
  //     text: 'correctText',
  //     fileIds: {},
  //     id: '1',
  //   };
  //
  //   const incorrectFeedback = {
  //     text: 'incorrectText',
  //     fileIds: {},
  //     id: '2',
  //   };
  //
  //   const originalItem = {
  //     question: {
  //       correctFeedback: { id: '1' },
  //       incorrectFeedback: { id: '2' }
  //     }
  //   };
  //
  //   const expectedAnswers = [{
  //     genusTypeId: genusTypes.answer.rightAnswer,
  //     feedback: correctFeedback.text,
  //     id: correctFeedback.id,
  //   }, {
  //     genusTypeId: genusTypes.answer.wrongAnswer,
  //     feedback: incorrectFeedback.text,
  //     id: incorrectFeedback.id,
  //   }];
  //
  //   const result = serializeAnswers(correctFeedback, incorrectFeedback, originalItem);
  //   expect(result).toEqual(expectedAnswers);
  // });
});
