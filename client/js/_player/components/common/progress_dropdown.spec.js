import React              from 'react';
import ReactDOM           from 'react-dom';
import TestUtils          from 'react-addons-test-utils';
import ProgressDropdown   from './progress_dropdown';

describe('progress dropdown', function() {
  var questions=[{material: "question 1"},{material: "question 2"}, {material: "question 3"}];
  var settings = {images: {}};
  var result = TestUtils.renderIntoDocument(<ProgressDropdown questions={questions} settings={settings} />);

  it('renders the progress dropdown labels', function() {
    expect(ReactDOM.findDOMNode(result).textContent).toContain(questions[0].material);
  });

});
