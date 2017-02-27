import React         from 'react';
import TestUtils     from 'react-addons-test-utils';
import Stub          from '../../../../../../specs_support/stub';
import Feedback      from './feedback';

describe('feedback function', () => {
  it('renders feedback to the DOM', () => {
    const result = TestUtils.renderIntoDocument(<Stub><Feedback /></Stub>);
    const label = TestUtils.scryRenderedDOMComponentsWithTag(result, 'label');
    expect(label.length).toBe(2);
  });
});
