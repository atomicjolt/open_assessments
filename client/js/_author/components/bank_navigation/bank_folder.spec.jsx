import React            from 'react';
import ReactDOM         from 'react-dom';
import { shallow }      from 'enzyme';
import renderer         from 'react-test-renderer';
import BankFolder       from './bank_folder';

describe('bank_folder component', () => {
  let props;
  let result;

  beforeEach(() => {
    props = {
      bank: {
        displayName: {
          text: 'Spec Name',
        },
      },
      getBankChildren: () => {},
      onFocus: () => {},
      focused: false,
    };
    result = shallow(<BankFolder {...props} />);
  });

  it('renders the component as a snapshot', () => {
    expect(result).toMatchSnapshot();
  });
});
