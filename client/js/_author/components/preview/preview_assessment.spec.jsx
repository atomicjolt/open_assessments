import React                   from 'react';
import TestUtils               from 'react-addons-test-utils';
import { PreviewAssessment }   from './preview_assessment';

jest.mock('../../../libs/assets');

describe('preview assessment component', () => {
  let result;
  let props;

  beforeEach(() => {
    props = {
      params: {},
      assessment: {},
      settings: {
        assessmentPlayerUrl: 'IMANASSEMENTPLAYERURL',
        api_url: 'IMAURL',
        unlock_next: 'ON_CORRECT'
      },
      getAssessmentOffered: () => {},
      getAssessments: () => {},
      getAssessmentItems: () => {},
      parsedParams: {},
    };
    result = TestUtils.renderIntoDocument(<PreviewAssessment {...props} />);
  });

  it('renders not loaded message', () => {
    const message = TestUtils.findRenderedDOMComponentWithClass(result, 'not-loaded');
    expect(message).toBeDefined();
  });

  it('renders the PreviewContainer component', () => {
    props.assessment = {
      assessmentOffered: 'not empty',
    };
    result = TestUtils.renderIntoDocument(<PreviewAssessment {...props} />);
    const iframe = TestUtils.scryRenderedDOMComponentsWithTag(result, 'iframe');
    expect(iframe.length).toBe(1);
  });

  it('loads state', () => {
    expect(result.state).toBeDefined();
  });
});
