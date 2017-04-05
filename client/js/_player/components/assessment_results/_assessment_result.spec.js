import React                  from 'react';
import ReactDOM               from 'react-dom';
import TestUtils              from 'react-addons-test-utils';
import { shallow }            from 'enzyme';
import { AssessmentResult }   from './_assessment_result';
import { readFixture }        from '../../../../specs_support/utils';

describe('assessment result', function() {

  let result;
  let props;

  beforeAll(function(){
    const settings = {
      assessment_kind: "SUMMATIVE"
    };
    const assessment =  readFixture("qti1/text.xml");
    const assessmentMetaData = {
      type:"QTI1"
    };
    const assessmentResult = {
      assessment_results_id:1,
      correct_list:[],
      errors:[]
    };
    props = {
      settings,
      assessment,
      assessmentMetaData,
      assessmentResult,
      questions:[],
      questionResponses:[],
      assessmentPostAnalytics:() => {},
      assessmentPostLtiOutcome:() => {},
      outcomes:() => [],
      sendSize: () => {},
      showLMSNavigation: () => {},
      navigateHome: () => {}
    };
    result = shallow(<AssessmentResult {...props} />);

  });

  it('renders the assessment result', () => {
    expect(result).toBeDefined();
  });
});
