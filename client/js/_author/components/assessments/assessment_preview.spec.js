import React        from 'react';
import TestUtils    from 'react-addons-test-utils';
import AssessmentPreview  from './assessment_preview';

describe('AssessmentPreview', () => {
  beforeEach(() => {
    // called = false;
    // props = {
    //   newItem: () => { called = true; }
    // };
    // result = TestUtils.renderIntoDocument(<Stub><AddQuestion {...props} /></Stub>);
  });

  // it('adds a new item', () => {
  //   const button = TestUtils.findRenderedDOMComponentWithClass(result, 'c-question-add__button');
  //   TestUtils.Simulate.click(button);
  //   expect(called).toBeTruthy();
  // });

  it('Gets embed code if assessment has no assessmentOfferedId', () => {});
  it('Renders null with no assessment', () => {});
  it('Renders iframe preview', () => {});
});
