import React              from 'react';
import DragAndDrop        from './drag_and_drop';
import genusTypes         from '../../../../constants/genus_types';

describe('drag_and_drop serializer', () => {
  let item;
  let newItem;
  let result;

  beforeEach(() => {
    item = {
      question: {
        id: 7,
        type: '',
        name: 'something',
        fileIds: {},
        zones: {},
        correctFeedback: {
          text: 'correctamundo',
          fileIds: '77',
        },
      },
      answers: [
        {
          id: 1,
          genusTypeId: genusTypes.answer.rightAnswer,
        },
      ],
    };
    newItem = {
      id: 7,
      name: 'something',
      question: {
        correctFeedback: 'Spec Feedback',
        timeValue: {
          hours: 1,
          minutes: 70,
          seconds: 100,
        },
      },
      answers: [],  
    };
    result = DragAndDrop(item, newItem);
  });

  it('accepts original item and newItemAttr', () => {
    expect(result.name).toBe('something');
  });

  it('handles the question.zones', () => {
    newItem.question.dropObjects = {};
    newItem.question.incorrectFeedback = 'Ive got no strings';
    result = DragAndDrop(item, newItem);
    console.log(result)
  });
});
