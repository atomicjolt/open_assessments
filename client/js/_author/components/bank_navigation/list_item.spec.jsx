import React            from 'react';
import { shallow }      from 'enzyme';
import ListItem         from './list_item';

describe('bank_assessment component', () => {
  let props;
  let result;

  beforeEach(() => {
    props = {
      selectItem: () => {},
      onFocus: () => {},
      bank: {
        displayName: {
          text: 'Spec Name',
        },
      },
      focused: false,
      children: [],
    };
    result = shallow(<ListItem {...props} />);
  });

  it('renders the component as a snapshot', () => {
    expect(result).toMatchSnapshot();
  });
});
