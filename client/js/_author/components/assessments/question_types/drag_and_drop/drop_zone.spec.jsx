import React            from 'react';
import { shallow }      from 'enzyme';
import DropZone         from './drop_zone';
import { languages }    from '../../../../../constants/language_types';

describe('drop zone component', () => {
  let props;
  let result;
  let zone;
  let calledEditZone;

  beforeEach(() => {
    calledEditZone = false;
    props = {
      zone: {
        id: '7',
        xPos: 7,
        yPos: 90,
        width: 949,
        height: 200,
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
      editZone: () => { calledEditZone = true; },
      setActive: () => {},
      isActive: false,
      language: languages.languageTypeId.english,
    };
    zone = {
      leftPos: props.zone.xPos,
      topPos: props.zone.yPos,
      rightPos: props.zone.xPos + props.zone.width,
      bottomPos: props.zone.yPos + props.zone.height,
      initialX: null,
      initialY: null,
    };
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
    expect(result.instance().zonePosition()).toEqual(jasmine.objectContaining({ position: 'absolute' }));
  });

  it('handles logic in moveCorner', () => {
    let corner = 'topLeft';
    const x = 95;
    const y = 100;
    result.instance().moveCorner(corner, x, y);
    expect(result.instance().state.leftPos).toBe(props.zone.xPos);
    expect(result.instance().state.topPos).toBe(props.zone.yPos);
    corner = 'topRight';
    result.instance().moveCorner(corner, x, y);
    expect(result.instance().state.rightPos).toBe(props.zone.xPos + props.zone.width);
    expect(result.instance().state.topPos).toBe(props.zone.yPos);
    corner = 'bottomRight';
    result.instance().moveCorner(corner, x, y);
    expect(result.instance().state.bottomPos).toBe(props.zone.yPos + props.zone.height);
    expect(result.instance().state.leftPos).toBe(props.zone.xPos);
    corner = 'bottomRight';
    result.instance().moveCorner(corner, x, y);
    expect(result.instance().state.bottomPos).toBe(props.zone.yPos + props.zone.height);
    expect(result.instance().state.rightPos).toBe(props.zone.xPos + props.zone.width);
  });

  it('handles logic in moveZone', () => {
    props.zone.xPos = 135;
    result = shallow(<DropZone {...props} />);
    const x = 95;
    const y = 45;
    const updatedPositions = {
      initailX: 55,
      initialY: 35,
    };
    result.instance().setState(updatedPositions);
    result.instance().moveZone(x, y);
    expect(result.instance().state.topPos).toBe(
      zone.topPos
      +
      (y - updatedPositions.initialY)
    );
    expect(result.instance().state.leftPos).toBe(props.zone.xPos);
    expect(result.instance().state.rightPos).toBe(
      props.target.getBoundingClientRect().right
      -
      props.target.getBoundingClientRect().left
    );
    expect(result.instance().state.bottomPos).toBe(
      zone.bottomPos
      +
      (y - updatedPositions.initialY)
    );
  });

  it('handles updateZone function call', () => {
    expect(calledEditZone).toBeFalsy();
    result.find('input').simulate('blur', { target: { label: 'Some random value' } });
    expect(calledEditZone).toBeTruthy();
  });
});
