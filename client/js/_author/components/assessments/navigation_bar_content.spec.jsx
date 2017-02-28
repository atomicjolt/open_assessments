import React            from 'react';
import TestUtils        from 'react-addons-test-utils';
import Stub             from '../../../../specs_support/stub';
import { hashHistory }  from 'react-router';
import AssessmentView   from './navigation_bar_content';

fdescribe('Assessment View component', () => {
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
  });
});
