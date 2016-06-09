import React              from 'react';
import ReactDOM           from 'react-dom';
import TestUtils          from '../../../node_modules/react/lib/ReactTestUtils';
import ProgressListItem   from './progress_list_item';

describe('Progress list item', function() {
  var question = {
    material: "Hello World"
  };

  var index = 0;
  var toggle = ()=>{};
  var result = TestUtils.renderIntoDocument(<ProgressListItem question={question} index={index} toggle={toggle} />);

  it('renders the progress list item', function() {
    expect(ReactDOM.findDOMNode(result).textContent).toContain("Hello World");
  });

});
