import React        from 'react';
import TestUtils    from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import Helper       from '../../../specs_support/helper';
import HomePage     from './home';

describe('home', () => {
  let result;
  let props;

  beforeEach(() => {
    props = {};
    result = TestUtils.renderIntoDocument(
      <Provider store={Helper.makeStore()}>
        <HomePage {...props} />
      </Provider>,
    );
  });

  it('renders the home component', () => {
    expect(result).toBeDefined();
  });
});
