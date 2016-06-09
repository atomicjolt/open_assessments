import React              from 'react';
import ReactDOM           from 'react-dom';
import TestUtils          from 'react/lib/ReactTestUtils';
import AssessmentResult   from './_assessment_result';
import AssessmentActions  from '../../actions/assessment';
// import SettingsActions    from '../../actions/settings';

describe('assessment result', function() {
  var srcData;
  var settings;
  beforeAll(function(){
    jasmine.getFixtures().fixturesPath = "base/specs_support/fixtures";
    srcData = readFixtures("qti1/text.xml");
    settings = {
      assessmentKind: "formative",
      srcUrl: "asdf",
      images: {}
    };

  });

  beforeEach(() => {

    jasmine.clock().install();
    AssessmentActions.loadAssessment(settings, srcData);
    jasmine.clock().tick();
    SettingsActions.load(settings);
    jasmine.clock().tick();
    jasmine.Ajax.install();
    AssessmentActions.submitAssessment("100", 0, [{}], "answers", {});
    jasmine.Ajax.requests.mostRecent().respondWith({
      "status"        : 200,
      "contentType"     : "text/plain",
      "responseText" : JSON.stringify({score: "100", feedback: "you did good", correct_list: [true], confidence_level_list: ["maybe"]})
    });
    jasmine.clock().tick(); // Advance the clock to the next tick
  });

  afterEach(() => {
    jasmine.clock().uninstall();
    jasmine.Ajax.uninstall();
  });

  it('renders the assessment result', function(){
    var result = TestUtils.renderIntoDocument(<AssessmentResult />);
    var content = ReactDOM.findDOMNode(result).textContent;
    expect(content.length > 0).toBe(true);
  });
});
