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
        zones: [{
          visible: 'vision'
        }],
        droppables: {
          id: 1,
          name: 'This is my name',
          text: 'urlforimage.example.com',
          dropBehaviorType: 'a type of a lot of things',
        },
        targets: {
          id: 7,
          text: 'anotherfunurl.com',
        },
      },
      answers: [
        {
          id: 1,
          genusTypeId: genusTypes.answer.rightAnswer,
          feedback: {
            text: 'something from nothing',
          },
          feedbacks: 'nothing from nothing',
          fileIds: {},
          zoneConditions: {
            zoneId: 1,
          },
        },
        {
          id: 2,
          genusTypeId: genusTypes.answer.wrongAnswer,
          feedback: {
            text: 'this is way worse than I thought',
          },
          feedbacks: 'weird',
          fileIds: {},
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
