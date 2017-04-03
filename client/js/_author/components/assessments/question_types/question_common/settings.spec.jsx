import React            from 'react';
import { shallow }      from 'enzyme';
import Settings         from './settings';

describe('Correct answer selector', () => {
  let result;
  let props;
  let updateItemValue;

  beforeEach(() => {
    updateItemValue = null;
    props = {
      id: 'bestIdEver',
      defaultName: 'Charles Bender',
      language: 'American',
      updateItem: (value) => { updateItemValue = value; },
      makeReflection: () => {},
    };
    result = shallow(<Settings {...props} />);
  });

  it('verifies defaultValue', () => {
    const input = result.find('input');
    expect(input.at(0).nodes[0].props.defaultValue).toBe('Charles Bender');
  });

  it('call onBlur and sets value', () => {
    const input = result.find('input');
    input.at(0).props().onBlur({ target: { value: 'lasers are neat' } });
    expect(updateItemValue.name).toBe('lasers are neat');
  });
});
