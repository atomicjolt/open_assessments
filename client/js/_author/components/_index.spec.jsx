import React      from 'react';
import TestUtils  from 'react-addons-test-utils';
import Index      from './_index';

describe('index', () => {
  it('renders children', () => {
    const result = TestUtils.renderIntoDocument(<Index>test text</Index>);
    const content = TestUtils.findRenderedDOMComponentWithTag(result, 'div');
    expect(content.textContent).toContain('test text');
  });
});
