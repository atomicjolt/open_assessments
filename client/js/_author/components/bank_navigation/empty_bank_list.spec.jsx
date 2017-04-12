import React            from 'react';
import { shallow }      from 'enzyme';
import EmptyBankList    from './empty_bank_list';

describe('empty_bank_list component', () => {
  let props;
  let result;

  beforeEach(() => {
    props = {};
    result = shallow(<EmptyBankList {...props} />);
  });

  it('renders the component as a snapshot', () => {
    expect(result).toMatchSnapshot();
  });
});
