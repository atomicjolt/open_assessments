import _ from 'lodash';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import AssessmentForm from './assessment_form';

fdescribe('AssessmentForm component', () => {
  let props;
  let result;
  let createItem;
  let updateItemOrderFunction;

  beforeEach(() => {
    createItem = false;
    updateItemOrderFunction = false;
    props = {
      items: [{
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
      }],
      name: 'IMASPEC',
      updateAssessment: () => {},
      updateItemOrder: () => {updateItemOrderFunction = true},
      createItem: () => {createItem = true},
      updateItem: () => {},
      updateChoice: () => {},
      updateAnswer: () => {},
      deleteAssessmentItem: () => {},
    };
    result = TestUtils.renderIntoDocument(<AssessmentForm {...props} />);
  });

  it('renders to the DOM', () => {
    const assessmentForm = TestUtils.findRenderedDOMComponentWithClass(
      result,
      'c-assessment-title'
    );
    expect(assessmentForm).toBeDefined();
  });

  it('renders AssessmentItems', () => {
    result.state.addingAssessment = true;
    const assessmentItems = TestUtils.findRenderedDOMComponentWithClass(
      result,
      'c-question'
    );
    expect(assessmentItems).toBeDefined();
  });

  it('renders two labels', () => {
    const labels = TestUtils.scryRenderedDOMComponentsWithClass(
      result,
      'test_label',
    );
    expect(labels.length).toBe(2);
  });

  it('creates a new item', () => {
    expect(createItem).toBeFalsy();
    result.createItem();
    expect(createItem).toBeTruthy();
  });

  it('employs show a new modal', () => {
    const addQuestion = TestUtils.scryRenderedDOMComponentsWithClass(
      result,
      'c-question-add__button',
    );
    expect(addQuestion.length).toBe(1);
    const assessmentForm = TestUtils.scryRenderedDOMComponentsWithClass(
      result,
      'is-active',
    );
    expect(assessmentForm.length).toEqual(0);
    expect(result.state).not.toBeNull();
  });

  it('activates a new item', () => {
    const itemId = '7';
    result.activateItem(itemId);
    expect(result.state.activeItem).toEqual(itemId);
    expect(result.state.reorderActive).toBeFalsy();
  });

  it('moves a new item', () => {
    expect(updateItemOrderFunction).toBeFalsy();
    expect(result.props.items[0].id).toBe('76');
    const oldIndex = props.items[0].id;
    const newIndex = '77';
    result.moveItem(oldIndex, newIndex);
    expect(updateItemOrderFunction).toBeTruthy();
  });
});
