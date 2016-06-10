import React              from 'react';
import ReactDOM           from 'react-dom';
import TestUtils          from 'react/lib/ReactTestUtils';
import AssessmentResult   from './_assessment_result';
import Rapper             from '../../../specs_support/rapper';
import configureStore     from '../../store/configure_store';

describe('assessment result', function() {

  var result;

  beforeAll(function(){
    jasmine.getFixtures().fixturesPath = "base/specs_support/fixtures";
    const settings = {};
    const assessment =  readFixtures("qti1/text.xml");
    var state = {
      settings,
      assessment
    };
    var store = configureStore(state);
    result = TestUtils.renderIntoDocument(<Rapper childProps={{store, params}} child={AssessmentResult}/>);

  });

  it('renders the assessment result', function(){
    instance = result.refs.original.getWrappedInstance();
    expect(ReactDOM.findDOMNode(instance)).toBeDefined();
    var content = ReactDOM.findDOMNode(instance).textContent;
    expect(content.length > 0).toBe(true);
  });
});
