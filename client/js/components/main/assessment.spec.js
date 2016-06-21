import React     from "react";
import ReactDOM  from "react-dom";
import TestUtils from "react/lib/ReactTestUtils";
import Helper    from "../../../specs_support/helper";

import { Assessment }          from './assessment';
import * as AssessmentActions  from "../../actions/assessment";

describe('assessment', function() {
  var result;

  beforeEach(() => {
    jasmine.clock().install();
    jasmine.Ajax.install();
    // AssessmentActions.submitAssessment("100", 0, "questions", "answers");
    // jasmine.Ajax.requests.mostRecent().respondWith({
    //   "status"        : 200,
    //   "contentType"     : "text/plain",
    //   "responseText" : "{}"
    // });
    jasmine.clock().tick();

    var settings ={
      enable_start:true,
      assessment_type:"SUMMATIVE"
    };
    var assessment = {
      isStarted:false
    };

    var props = {
      assessmentViewed:() => {},
      settings,
      assessment
    };

    result = TestUtils.renderIntoDocument(<Assessment {...props} />);
  });

  afterEach(() => {

    jasmine.clock().uninstall();
    jasmine.Ajax.uninstall();
  });

  it('renders the assessment', function(){
    expect(result).toBeDefined();
  });
});
