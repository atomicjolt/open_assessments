import React         from 'react';
import { shallow }   from 'enzyme';
import Header        from './_header';
import Reorder       from './reorder';
import DefaultHeader from './default';

describe('header component', () => {
  let result;
  let props;

  beforeEach(() => {
    props = {
      reorderActive: false,
      type: 'item-genus-type%3Aqti-choice-interaction%40ODL.MIT.EDU',
      index: 7,
    };
    result = shallow(<Header {...props} />);
  });

  it('displays the index number + 1', () => {
    expect(result.find('.au-c-question__number').text()).toEqual('8');
  });

  it('displays Multiple Choice when specific value is present', () => {
    props.type = 'multipleChoice';
    result = shallow(<Header {...props} />);
    const questionType = result.find('.au-c-question__type');
    expect(questionType.text()).toContain('Multiple Choice');
  });

  it('renders DefaultHeader when props.reorderActive is false', () => {
    const defaultHeader = result.find(DefaultHeader);
    const reorderHeader = result.find(Reorder);
    expect(defaultHeader.length).toBe(1);
    expect(reorderHeader).toBeDefined();
  });

  it('renders ReorderHeader when props.reorderActive is true', () => {
    props.reorderActive = true;
    result = shallow(<Header {...props} />);
    const defaultHeader = result.find('.au-c-question-icons');
    const reorderHeader = result.find(Reorder);
    expect(defaultHeader).toBeDefined();
    expect(reorderHeader).toBeDefined();
  });
});
