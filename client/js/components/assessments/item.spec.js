import React              from 'react';
import ReactDOM           from 'react-dom';
import TestUtils          from 'react/lib/ReactTestUtils';
import Item               from './item';

describe('item', function() {

  var question = {};
  var currentItemIndex = 0;

  var settings = {
    assessmentKind: "formative"
  };

  var assessment = {};
  var questionCount = 10;
  var result = TestUtils.renderIntoDocument(<Item question={question} currentItemIndex={currentItemIndex} settings={settings} questionCount={questionCount} assessment={assessment} />);

  it('renders an item', function() {
    expect(ReactDOM.findDOMNode(result).textContent).toContain("Choose ALL that apply");
  });

});
