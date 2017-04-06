import React        from 'react';
import { shallow }  from 'enzyme';

import { ClixDragAndDrop } from './clix_drag_and_drop';
import DropZone            from './clix_drop_zone';
import Droppable           from './droppable';

describe('clix drag and drop', () => {

  let result;
  let props;
  let answerSelected;

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
      selectAnswer: selectedAnswer => (answerSelected = selectedAnswer),
      selectedAnswers: [{
        id: {
          id: 'answer_id',
          zoneIndex: 0,
        },
        droppable: {
          id: 'answer_id',
        },
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
      expect(zones.at(0).props().style.left).toBe(-50);
      expect(zones.at(0).props().style.top).toBe(-50);
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
