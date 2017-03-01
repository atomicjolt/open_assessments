import React        from 'react';
import TestUtils    from 'react-addons-test-utils';
import Stub         from '../../../../../specs_support/stub';
import ShortAnswer  from './short_answer';

describe('Sets size for short answer', () => {
  let result;
  let props;
  const items = ['first', 'second'];

  beforeEach(() => {
    props = {
      updateItem: newProps => this.updateItem(newProps),
      item: items
    };
    result = TestUtils.renderIntoDocument(<Stub><ShortAnswer {...props} /></Stub>);
  });

  it('verifies initial size', () => {
    const select = TestUtils.scryRenderedDOMComponentsWithTag(result, 'select')[0];
    expect(select.value).toBe('large');
  });
});
