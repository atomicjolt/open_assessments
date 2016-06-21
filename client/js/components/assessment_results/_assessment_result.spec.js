import React              from 'react';
import ReactDOM           from 'react-dom';
import TestUtils          from 'react/lib/ReactTestUtils';
import { AssessmentResult }   from './_assessment_result';
import Rapper             from '../../../specs_support/rapper';
import configureStore     from '../../store/configure_store';

describe('assessment result', function() {

  var result;

  beforeAll(function(){
    jasmine.getFixtures().fixturesPath = "base/specs_support/fixtures";
    const settings = {
      assessment_kind: "SUMMATIVE"
    };
    const assessment =  readFixtures("qti1/text.xml");
    const assessmentMetaData = {
      type:"QTI1"
    };
    const assessmentResult = {
      assessment_results_id:1,
      correct_list:[],
      errors:[]
    };
    var props = {
      settings,
      assessment,
      assessmentMetaData,
      assessmentResult,
      questions:[],
      questionResponses:[],
      assessmentPostAnalytics:() => {},
      assessmentPostLtiOutcome:() => {},
      outcomes:() => []
    };
    result = TestUtils.renderIntoDocument(<AssessmentResult {...props} />);

  });

  it('renders the assessment result', function(){
    expect(ReactDOM.findDOMNode(result)).toBeDefined();
    var content = ReactDOM.findDOMNode(result).innerText;
    expect(content.length > 0).toBe(true);
  });
});
