import React          from 'react';
import ReactDOM       from 'react-dom';
import { shallow }    from 'enzyme';
import renderer       from 'react-test-renderer';
import ImageOption    from './image_option';

describe('image_option component', () => {
  it('renders a snapshot', () => {
    const tree = renderer.create(<ImageOption />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
