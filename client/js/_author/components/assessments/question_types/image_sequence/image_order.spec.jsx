import React          from 'react';
import { shallow }    from 'enzyme';
import ImageOrder     from './image_order';

describe('image_order component', () => {
  let props;
  let result;

  beforeEach(() => {
    props = {
      item: {
        id: '',
        question: {
          choices: {}
        }
      },
      deleteChoice: () => {},
      updateChoice: () => {},
    };
    result = shallow(<ImageOrder {...props} />);
  });
  it('renders a snapshop of the component', () => {
    expect(result).toMatchSnapshot();
  });
});
