import React              from 'react';
import ReactDOM           from 'react-dom';
import Immutable          from 'immutable';
import TestUtils          from 'react/lib/ReactTestUtils';

import { Start }              from './start';

describe('start', function() {
  var result;
  var subject;
  var settings;
  var assessment;
  var props;

  beforeEach(()=>{
    settings = Immutable.fromJS({
      src_url         : "asdf",
      jwt             : "asdfasdf",
      csrf            : "asdfasfd",
      api_url         : "www.example.com"
    });

    assessment = Immutable.fromJS({
      title:"Test Title",
      assessment_kind : "SUMMATIVE"
    });

    props = {
      settings,
      assessment
    };

    result = TestUtils.renderIntoDocument(<Start {...props} /> );
    subject = ReactDOM.findDOMNode(result);
  });

  it('renders the start page', () => {
    expect(subject).toBeDefined();
  });

  it('renders assessment title', () => {
    expect(subject.innerHTML).toContain("Test Title");
  });

  it('renders summative', () =>{
    expect(subject.innerHTML).toContain("Summative");
  });
  it('renders default', () =>{
    assessment = assessment.set('assessment_kind', '');
    props = {
      assessment,
      settings
    };
    result = TestUtils.renderIntoDocument(<Start {...props} /> );
    subject = ReactDOM.findDOMNode(result);

    expect(subject.innerHTML).not.toContain("Summative");
    expect(subject.innerHTML).not.toContain("Formative");
    expect(subject.innerHTML).not.toContain("Show What You Know");
  });

});
