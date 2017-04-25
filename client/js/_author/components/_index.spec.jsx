import React        from 'react';
import { shallow }  from 'enzyme';
import { Index }    from './_index';

describe('index', () => {
  let props;
  let result;

  beforeEach(() => {
    props = {
      getBanks: () => {},
    };

    result = shallow(<Index {...props} >test text</Index>);
  });

  it('renders children', () => {
    expect(result.text()).toContain('test text');
  });
});
