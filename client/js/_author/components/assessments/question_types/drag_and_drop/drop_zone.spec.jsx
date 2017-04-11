import React            from 'react';
import ReactDOM         from 'react-dom';
import { shallow }      from 'enzyme';
import renderer         from 'react-test-renderer';
import DropZone         from './drop_zone';

describe('drop zone component', () => {
  let props;
  let result;
  let zone;

  beforeEach(() => {
    props = {
      zone: {
        id: '7',
        xPos: 7,
        yPos: 90,
        width: '940px',
        height: '200px',
        initialX: null,
        initialY: null,
      },
      target: {
        getBoundingClientRect: () => ({
          top: 234,
          bottom: 623,
          left: 143,
          right: 555,
        }),
      },
      editZone: () => {},
      setActive: () => {},
      isActive: false,
    };
    zone = {
      leftPos: props.zone.xPos,
      topPos: props.zone.yPos,
      rightPos: props.zone.xPos + props.zone.width,
      bottomPos: props.zone.yPos + props.zone.height,
      initialX: null,
      initialY: null,
    }
    result = shallow(<DropZone {...props} />);
  });

  it('renders the component as a snapshot', () => {
    expect(result).toMatchSnapshot();
  });

  it('sets state with zone', () => {
    expect(result.instance().state.topPos).toBe(zone.topPos);
    expect(result.instance().state.leftPos).toBe(zone.leftPos);
    expect(result.instance().state.rightPos).toBe(zone.rightPos);
    expect(result.instance().state.bottomPos).toBe(zone.bottomPos);
  });

  it('effectively calls boundary check', () => {
    expect(DropZone.boundaryCheck(-1, 15)).toBe(0);
    expect(DropZone.boundaryCheck(15, 5)).toBe(5);
    expect(DropZone.boundaryCheck(5, 15)).toBe(5);
  });

  it('runs zonePosition', () => {
    expect(result.instance().zonePosition()).toEqual(jasmine.objectContaining({position: "absolute"}));
  });

  it('handles logic in moveCorner', () => {
    const corner = 'topLeft';
    const x = 95;
    const y = 100;
    result.instance().moveCorner(corner, x, y,);
    expect(result.instance().state.topPos).toBe(90);
  });
});
