import React      from 'react';
import TestUtils  from 'react-addons-test-utils';
import Stub       from '../../../../specs_support/stub';
import Heading    from './heading';

describe('Heading', () => {
  let result;
  let props;

  beforeEach(() => {
    props = {
      view: 'banks',
    };

    result = TestUtils.renderIntoDocument(<Stub><Heading {...props} /></Stub>);
  });

  it('has a logo', () => {
    expect(TestUtils.findRenderedDOMComponentWithTag(result, 'img')).toBeDefined();
  });

  it('renders the Bank view content', () => {
    expect(TestUtils.findRenderedDOMComponentWithClass(result, 'au-c-header-bottom')).toBeDefined();
  });
});
