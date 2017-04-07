import React            from 'react';
import ReactDOM         from 'react-dom';
import { shallow }      from 'enzyme';
import renderer         from 'react-test-renderer';
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
