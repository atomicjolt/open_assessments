import React          from 'react';
import ReactDOM       from 'react-dom';
import { shallow }    from 'enzyme';
import renderer       from 'react-test-renderer';
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
