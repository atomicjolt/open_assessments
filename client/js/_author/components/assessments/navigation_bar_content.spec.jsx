import React            from 'react';
import TestUtils        from 'react-addons-test-utils';
import Stub             from '../../../../specs_support/stub';
import AssessmentView   from './navigation_bar_content';

describe('New Assessments View', () => {
  let result;
  let props;
  const isPublished = true;

  beforeEach(() => {
    props = {
      view: 'assessments',
      togglePublishAssessment: () => {},
      isPublished,
      items: [{ something: 'stuff' }, { something: 'boom' }],
      assessment: {
        bankId: 'id12345',
        assessmentId: 'assessmentId46587'
      },
      bankId: '1222',
      getBankChildren: () => {}
    };
    result = TestUtils.renderIntoDocument(<Stub><AssessmentView {...props} /></Stub>);
  });

  it('determines amount of buttons from number of items', () => {
    props.isPublished = false;
    result = TestUtils.renderIntoDocument(<Stub><AssessmentView {...props} /></Stub>);

    let buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    expect(buttons.length).toBe(2);
    props.items = [];
    result = TestUtils.renderIntoDocument(<Stub><AssessmentView {...props} /></Stub>);
    buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    expect(buttons.length).toBe(1);
  });

  it('click editPublish button', () => {
    spyOn(props, 'togglePublishAssessment');
    result = TestUtils.renderIntoDocument(<Stub><AssessmentView {...props} /></Stub>);
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    TestUtils.Simulate.click(buttons[1]);
    expect(props.togglePublishAssessment).toHaveBeenCalled();
  });

  it('Determines Icon status', () => {
    result = TestUtils.renderIntoDocument(<Stub><AssessmentView {...props} /></Stub>);
    let icons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'i');
    expect(icons[1].textContent).toBe('cloud_done');

    props.isPublished = false;
    result = TestUtils.renderIntoDocument(<Stub><AssessmentView {...props} /></Stub>);
    icons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'i');
    expect(icons[1].textContent).toBe('cloud_upload');
  });
});
