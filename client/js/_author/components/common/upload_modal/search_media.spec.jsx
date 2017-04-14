import React            from 'react';
import { shallow }      from 'enzyme';
import SearchMedia      from './search_media';

describe('search media component', () => {
  let props;
  let result;

  beforeEach(() => {
    props = {
      media: {},
      loading: false,
      selectedMediaId: '',
      selectMedia: () => {},
    };
    result = shallow(<SearchMedia {...props} />);
  });

  it('matches the taken snapshot', () => {
    expect(result).toMatchSnapshot();
  });

  it('handles setting the state', () => {
    expect(result.instance().state.offset).toBe(0);
    const data = {
      selected: 5,
    };
    result.instance().handlePageClick(data);
    expect(result.instance().state.offset).toBe(40);
  });
});
