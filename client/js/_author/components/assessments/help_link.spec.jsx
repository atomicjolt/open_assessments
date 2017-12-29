import React        from 'react';
import { shallow }  from 'enzyme';
import HelpLink   from './help_link';

describe('help_link component', () => {
  let props;
  let result;

  beforeEach(() => {
    props = {
      to: '/somewhere.html',
    };
    result = shallow(<HelpLink {...props} />);
  });

  it('matches the snapshot taken', () => {
    expect(result).toMatchSnapshot();
  });

  it('should also render with an icon', () => {
    expect(result.find('.material-icons').length).toBe(0);
    props = {
      to: '/somewhere.html',
      icon: true
    };
    result = shallow(<HelpLink {...props} />);
    expect(result.find('.material-icons').length).toBe(1);
  });
});
