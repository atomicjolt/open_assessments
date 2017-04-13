import React            from 'react';
import TestUtils        from 'react-addons-test-utils';
import { EditAssessment }  from './_edit_assessment';

jest.mock('../../../libs/assets');

describe('_edit_assessment component', () => {
  let props;
  let result;
  let handleFunction;
  let didMount;
  let didGetAssessmentItems;

  beforeEach(() => {
    handleFunction = false;
    didMount = false;
    didGetAssessmentItems = false;

    props = {
      params: {
        id: '7',
        bankId: '77',
      },
      assessment: {
        id: '7',
        bankId: '77',
        items: [
          {
            id: '7',
            displayName: 'IMASPEC',
            description: 'IMANOTHERSPEC',
          },
        ],
      },
      currentAssessment: {
        assignedBankIds: [],
      },
      settings: {
        editableBankId: '77',
        publishedBankId: '77',
      },
      togglePublishAssessment: () => {},
      getAssessments: () => { didMount = true; },
      updateAssessment: () => { handleFunction = true; },
      updateAssessmentItems: () => { handleFunction = true; },
      getAssessmentItems: () => { didGetAssessmentItems = true; },
      createItemInAssessment: () => { handleFunction = true; },
      updateItem: () => { handleFunction = true; },
      items: [
        {
          id: '7',
          displayName: {
            languageTypeId: '639-2%3AENG%40ISO',
          },
          description: {
            text: 'IMANOTHERSPEC'
          },
        },
      ],
      updateChoice: () => {},
      updateAnswer: () => {},
      deleteAssessmentItem: () => { handleFunction = true; },
      updatePath: () => {},
      banks: [],
      updateSingleItemOrPage: () => {},
      isPublished: false,
    };
    result = TestUtils.renderIntoDocument(<EditAssessment {...props} />);
  });

  it('renders Assessment Form to DOM', () => {
    const assessmentForm = TestUtils.scryRenderedDOMComponentsWithClass(result, 'au-c-assessment-title');
    expect(assessmentForm.length).toBe(1);
  });

  it('renders Heading to DOM', () => {
    const heading = TestUtils.scryRenderedDOMComponentsWithClass(result, 'au-c-logo');
    expect(heading.length).toBe(1);
  });

  it('runs updateItemOrder function', () => {
    expect(handleFunction).toBeFalsy();
    result.updateItemOrder();
    expect(handleFunction).toBeTruthy();
  });

  it('runs createItem', () => {
    expect(handleFunction).toBeFalsy();
    result.createItem();
    expect(handleFunction).toBeTruthy();
  });

  it('runs updateItem', () => {
    expect(handleFunction).toBeFalsy();
    result.updateItem();
    expect(handleFunction).toBeTruthy();
  });

  it('runs updateAssessment', () => {
    expect(handleFunction).toBeFalsy();
    result.updateAssessment();
    expect(handleFunction).toBeTruthy();
  });

  it('componentDidMount to be called', () => {
    expect(didMount).toBeTruthy();
    expect(didGetAssessmentItems).toBeTruthy();
  });

});
