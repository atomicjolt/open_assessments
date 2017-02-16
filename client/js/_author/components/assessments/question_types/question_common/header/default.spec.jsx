import React         from 'react';
import TestUtils     from 'react-addons-test-utils';
import _             from 'lodash';
import Stub         from '../../../../../../../specs_support/stub';
import DefaultHeader from './default';

describe('default question header', () => {
  let result;
  let props;
  let deleteCalled;
  let reorderCalled;

  beforeEach(() => {
    deleteCalled = false;
    reorderCalled = false;
    props = {
      deleteAssessmentItem: () => { deleteCalled = true; },
      toggleReorder: () => { reorderCalled = true; }
    };
    result = TestUtils.renderIntoDocument(<Stub><DefaultHeader {...props} /></Stub>);
  });

  it('deletes an item', () => {
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    TestUtils.Simulate.click(_.last(buttons));
    expect(deleteCalled).toBeTruthy();
  });

  it('toggles reordering', () => {
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    TestUtils.Simulate.click(buttons[1]);
    expect(reorderCalled).toBeTruthy();
  });
});
