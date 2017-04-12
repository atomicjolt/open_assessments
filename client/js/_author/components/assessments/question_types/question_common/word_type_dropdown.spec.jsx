import React              from 'react';
import { shallow }        from 'enzyme';
import WordTypeDropdown   from './word_type_dropdown';

describe('word_type_dropdown component', () => {
  let props;
  let result;
  let calledFunc;

  beforeEach(() => {
    calledFunc = false;
    props = {
      id: '',
      wordType: 'is-ordered',
      updateChoice: () => { calledFunc = true; },
    };
    result = shallow(<WordTypeDropdown {...props} />);
  });

  it('renders the component', () => {
    expect(result.find(`.${props.wordType}`).length).toBe(1);
  });

  it('renders a select', () => {
    expect(result.find('select').length).toBe(1);
  });

  it('calls updateChoice', () => {
    expect(calledFunc).toBeFalsy();
    const select = result.find('select');
    select.simulate('change', { target: { value: 'verb' } });
    expect(calledFunc).toBeTruthy();
  });
});
