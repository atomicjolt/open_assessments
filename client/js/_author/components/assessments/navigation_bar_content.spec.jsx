import React            from 'react';
import TestUtils        from 'react-addons-test-utils';
import Stub             from '../../../../specs_support/stub';
import { hashHistory }  from 'react-router';
import AssessmentView   from './navigation_bar_content';

describe('Assessment View component', () => {
  let props;
  let result;
  let editButtonPushed;

  beforeEach(() => {
    editButtonPushed = false;
    props = {
      editOrPublishAssessment: () => {editButtonPushed = true},
      isPublished: false,
      items: {
        id: '76',
        displayName: {
          text: 'IMATITLESPEC',
          languageTypeId: '639-2%3AENG%40ISO',
        },
        description: {
          text: 'IMADESCRIPTION',
        },
        genusTypeId: '3',
        index: 1,
        question: {
          shuffle: true,
        },
      },
    };
    result = TestUtils.renderIntoDocument(<Stub><AssessmentView {...props} /></Stub>);
  });

  it('renders 3 buttons to the screen when items is not empty', () => {
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    expect(buttons.length).toBe(3);
  });

  it('renders 2 buttons to the screen when items is empty', () => {
    props.items = {};
    result = TestUtils.renderIntoDocument(<Stub><AssessmentView {...props} /></Stub>);
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    expect(buttons.length).toBe(2);
  });

  it('calls editOrPublishAssessment upon button click', () => {
    expect(editButtonPushed).toBeFalsy();
    const button = TestUtils.findRenderedDOMComponentWithClass(result, 'c-btn--green');
    expect(button).toBeDefined();
    TestUtils.Simulate.click(button);
    expect(editButtonPushed).toBeTruthy();
  });

  it('pushes to / from hashHistory', () => {
    const button = TestUtils.findRenderedDOMComponentWithClass(result, 'c-btn--back');
    spyOn(hashHistory, 'push');
    expect(button).toBeDefined();
    TestUtils.Simulate.click(button);
    expect(hashHistory.push).toHaveBeenCalledWith('/');
import React      from 'react';
import TestUtils  from 'react-addons-test-utils';
import { hashHistory }  from 'react-router';
import Stub               from '../../../../specs_support/stub';
import AssessmentsView    from './navigation_bar_content';

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
    result = TestUtils.renderIntoDocument(<Stub><AssessmentsView {...props} /></Stub>);
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
    result = TestUtils.renderIntoDocument(<Stub><AssessmentsView {...props} /></Stub>);
    buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    expect(buttons.length).toBe(2);
  });

  it('click editPublish button', () => {
    result = TestUtils.renderIntoDocument(<Stub><AssessmentsView {...props} /></Stub>);
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    TestUtils.Simulate.click(buttons[1]);
    expect(isEditOrPublishAssessment).toBeTruthy();
  });

  it('Determins Icon status', () => {
    result = TestUtils.renderIntoDocument(<Stub><AssessmentsView {...props} /></Stub>);
    let icons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'i');
    expect(icons[1].textContent).toBe('cloud_done');

    props.isPublished = false;
    result = TestUtils.renderIntoDocument(<Stub><AssessmentsView {...props} /></Stub>);
    icons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'i');
    expect(icons[1].textContent).toBe('cloud_upload');
  });
});
