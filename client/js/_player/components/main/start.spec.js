import React              from 'react';
import ReactDOM           from 'react-dom';
import Immutable          from 'immutable';
import TestUtils          from 'react-addons-test-utils';
import localizeStrings    from '../../selectors/localize';
import { Start }          from './start';

describe('start', function() {
  var result;
  var subject;
  var settings;
  var assessment;
  var props;

  beforeEach(()=>{
    props = {
      title:"Test Title",
      assessment_kind:"SUMMATIVE",
      localizedStrings: localizeStrings({settings:{locale:"en"}})
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
    props['assessment_kind'] = '';
    result = TestUtils.renderIntoDocument(<Start {...props} /> );
    subject = ReactDOM.findDOMNode(result);

    expect(subject.innerHTML).not.toContain("Summative");
    expect(subject.innerHTML).not.toContain("Formative");
    expect(subject.innerHTML).not.toContain("Show What You Know");
  });

});
