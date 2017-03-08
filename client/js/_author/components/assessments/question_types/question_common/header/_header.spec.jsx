import React         from 'react';
import TestUtils     from 'react-addons-test-utils';
import _             from 'lodash';
import Stub          from '../../../../../../../specs_support/stub';
import Header        from './_header';

describe('header component', () => {
  let result;
  let props;

  beforeEach(() => {
    props = {
      reorderActive: false,
      type: 'item-genus-type%3Aqti-choice-interaction%40ODL.MIT.EDU',
      index: 7,
    };
    result = TestUtils.renderIntoDocument(<Stub><Header {...props} /></Stub>);
  });

  it('displays the index number + 1', () => {
    const questionNumber = TestUtils.findRenderedDOMComponentWithClass(
      result,
      'au-c-question__number',
    );
    expect(questionNumber.textContent).toEqual('Question 8');
  });

  it('displays Multiple Choice when specific value is present', () => {
    props.type = 'multipleChoice';
    result = TestUtils.renderIntoDocument(<Stub><Header {...props} /></Stub>);
    const questionType = TestUtils.findRenderedDOMComponentWithClass(
      result,
      'au-c-question__type',
    );
    expect(questionType.textContent).toContain('Multiple Choice');
  });

  it('renders DefaultHeader when props.reorderActive is false', () => {
    const defaultHeader = TestUtils.findRenderedDOMComponentWithClass(
      result,
      'au-c-question-icons',
    );
    const reorderHeader = TestUtils.scryRenderedDOMComponentsWithClass(
      result,
      'au-c-question-icons--reorder',
    );
    expect(defaultHeader).toBeDefined();
    expect(reorderHeader).toEqual([]);
  });

  it('renders ReorderHeader when props.reorderActive is true', () => {
    props.reorderActive = true;
    result = TestUtils.renderIntoDocument(<Stub><Header {...props} /></Stub>);
    const defaultHeader = TestUtils.findRenderedDOMComponentWithClass(
      result,
      'au-c-question-icons',
    );
    const reorderHeader = TestUtils.findRenderedDOMComponentWithClass(
      result,
      'au-c-question-icons--reorder',
    );
    expect(defaultHeader).toBeDefined();
    expect(reorderHeader).toBeDefined();
  });
});
