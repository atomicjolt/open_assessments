import React            from 'react';
import { shallow }      from 'enzyme';
import WordTypeDropdown from './word_type_dropdown';

describe('the word type dropdown', () => {
  let props;
  let result;
  let calledFunc;

  beforeEach(() => {
    calledFunc = false;
    props = {
      id: '4',
      wordType: 'verb',
      updateChoice: () => {calledFunc = true},
    };
    result = shallow(<WordTypeDropdown {...props} />);
  });

  it('renders a label', () => {
    expect(result.find('label').length).toBe(1);
  });

  it('calls props.updateChoice', () => {
    expect(calledFunc).toBeFalsy();
    result.find('#option_word_4').simulate('change', { target: { value: 'Preposition' } });
    expect(calledFunc).toBeTruthy();
  });

  it('sets value of select as props.wordType', () => {
    const select = result.find('select');
    expect(select.props().value).toBe(props.wordType);
  });
});
