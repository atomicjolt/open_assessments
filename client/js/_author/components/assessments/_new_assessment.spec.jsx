import React              from 'react';
import TestUtils          from 'react-addons-test-utils';
import { NewAssessment }  from './_new_assessment';

jest.mock('../../../libs/assets');

describe('_new_assessment component', () => {
  let props;
  let result;
  let callFunction;

  beforeEach(() => {
    callFunction = false;
    props = {
      params: {
        id: '7',
      },
      bankId: '',
      editableBankId: '77',
      createAssessment: () => { callFunction = true; },
      publishAssessment: () => {},
      createAssessmentWithItem: () => { callFunction = true; },
      updateItem: () => {},
      updateChoice: () => {},
      createChoice: () => {},
      updatePath: () => {},
      getAssessments: () => {},
    };
    result = TestUtils.renderIntoDocument(<NewAssessment {...props} />);
  });

  it('calls createAssessment', () => {
    expect(callFunction).toBeFalsy();
    result.createAssessment();
    expect(callFunction).toBeTruthy();
  });

  it('calls createItem', () => {
    expect(callFunction).toBeFalsy();
    result.createItem();
    expect(callFunction).toBeTruthy();
  });

  it('renders Heading and Assessment Form to DOM', () => {
    const heading = TestUtils.findRenderedDOMComponentWithClass(result, 'au-c-logo');
    expect(heading).toBeDefined();
    const assessmentForm = TestUtils.findRenderedDOMComponentWithClass(result, 'au-c-assessment-title');
    expect(assessmentForm).toBeDefined();
  });

});
