import React                from 'react';
import { shallow }          from 'enzyme';
import LanguageDropdown     from './language_dropdown';

describe('language_dropdown component', () => {
  let props;
  let result;
  let calledFunc;

  beforeEach(() => {
    calledFunc = false;
    props = {
      updateItem: () => { calledFunc = true; },
    };
    result = shallow(<LanguageDropdown {...props} />);
  });

  it('renders a snapshot of the component', () => {
    expect(result).toMatchSnapshot();
  });

  it('calls the updateItem function onChange', () => {
    expect(calledFunc).toBeFalsy();
    result.find('select').simulate('change', { target: { value: 'Spanglish' } });
    expect(calledFunc).toBeTruthy();
  });
});
