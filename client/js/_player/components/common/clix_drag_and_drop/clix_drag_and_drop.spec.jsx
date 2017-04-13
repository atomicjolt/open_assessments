import React        from 'react';
import { shallow }  from 'enzyme';

import { ClixDragAndDrop } from './clix_drag_and_drop';
import DropZone            from './clix_drop_zone';
import Droppable           from './droppable'; // eslint-disable-line import/no-named-as-default

describe('clix drag and drop', () => {

  let result;
  let props;

  beforeEach(() => {
    props = {
      answers: [{
        id: 'answer_id',
        text: 'answer_text',
        reuse: 1,
      }],
      zones: [{
        spatialUnit: {
          coordinateValues: [0, 0],
          width: 100,
          height: 100,
        },
        dropBehaviorType: 'drop.behavior%3Asnap%40ODL.MIT.EDU',
      }],
      targets: [{
        text: 'target_text',
      }],
      selectAnswer: () => {},
      selectedAnswers: [{
        id: {
          id: 'answer_id',
          zoneIndex: 0,
        },
        droppableId: 'answer_id',
        zoneIndex: 0,
        coordinateValues: [0, 0],
        width: 50,
        height: 50,
      }]
    };

    result = shallow(<ClixDragAndDrop {...props} />);
  });

  describe('renders', () => {
    it('renders targets', () => {
      expect(result.find('.c-drag-target').length).toBe(1);
    });

    it('renders zones', () => {
      const zones = result.find(DropZone);
      expect(zones.length).toBe(2);
      expect(zones.at(0).props().style.left).toBe(0);
      expect(zones.at(0).props().style.top).toBe(0);
    });

    it('renders selected answers', () => {
      const answers = result.find(Droppable);
      expect(answers.length).toBe(2); // one selected, one hidden below
      expect(answers.at(0).props().style.left).toBe(-25);
      expect(answers.at(0).props().style.top).toBe(-25);
    });

    it('renders droppable start drop zone', () => {
      const zones = result.find(DropZone);
      expect(zones.length).toBe(2);
      expect(zones.at(1).props().canDrop).toBe(true);
    });

    it('renders available answers', () => {
      const answers = result.find(Droppable);
      expect(answers.length).toBe(2); // one selected, one hidden
      expect(answers.at(1).props().hide).toBe(true);
    });
  });

});
