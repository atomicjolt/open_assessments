import React            from 'react';
import TestUtils        from 'react-addons-test-utils';
import Stub             from '../../../../specs_support/stub';
import { hashHistory }  from 'react-router';
import AssessmentView   from './navigation_bar_content';

describe('New Assessments View', () => {
  let result;
  let props;
  const isPublished = true;
  let isEditOrPublishAssessment = false;

  beforeEach(() => {
    props = {
      view: 'assessments',
      editOrPublishAssessment: () => isEditOrPublishAssessment = !isEditOrPublishAssessment,
      isPublished,
      items: ['stuff', 'boom'],
    };
    result = TestUtils.renderIntoDocument(<Stub><AssessmentView {...props} /></Stub>);
  });

  it('calls button onClick for hashHistory', () => {
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    spyOn(hashHistory, 'push');
    TestUtils.Simulate.click(buttons[0]);
    expect(hashHistory.push).toHaveBeenCalledWith('/');
  });

  it('determines amount of buttons from number of items', () => {
    let buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    expect(buttons.length).toBe(3);
    props.items = [];
    result = TestUtils.renderIntoDocument(<Stub><AssessmentView {...props} /></Stub>);
    buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    expect(buttons.length).toBe(2);
  });

  it('click editPublish button', () => {
    result = TestUtils.renderIntoDocument(<Stub><AssessmentView {...props} /></Stub>);
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    TestUtils.Simulate.click(buttons[1]);
    expect(isEditOrPublishAssessment).toBeTruthy();
  });

  it('Determins Icon status', () => {
    result = TestUtils.renderIntoDocument(<Stub><AssessmentView {...props} /></Stub>);
    let icons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'i');
    expect(icons[1].textContent).toBe('cloud_done');

    props.isPublished = false;
    result = TestUtils.renderIntoDocument(<Stub><AssessmentView {...props} /></Stub>);
    icons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'i');
    expect(icons[1].textContent).toBe('cloud_upload');
  });
});
