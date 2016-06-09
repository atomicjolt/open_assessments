import React     from "react";
import ReactDOM  from "react-dom";
import TestUtils from "react/lib/ReactTestUtils";
import Helper    from "../../../specs_support/helper";

import Assessment         from './assessment';
import AssessmentActions from '../../actions/assessment';

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
    result = TestUtils.renderIntoDocument(<Assessment />);
  });

  afterEach(() => {

    jasmine.clock().uninstall();
    jasmine.Ajax.uninstall();
  });

  it('renders the assessment', function(){
    expect(result).toBeDefined();
  });
});
