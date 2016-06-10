import React              from 'react';
import ReactDOM           from 'react-dom';
import TestUtils          from 'react/lib/ReactTestUtils';
import Checkbox           from './checkbox';

describe('checkbox', function() {

  var item = {
    id: 1,
    material: "checkbox label"
  };
  var result = TestUtils.renderIntoDocument(<Checkbox item={item} name="answer-radio" />);

  it('renders the checkbox label', function() {
    expect(ReactDOM.findDOMNode(result).textContent).toContain(item.material);
  });

  it('renders input attributes', function() {
    expect(ReactDOM.findDOMNode(result).childNodes[0].childNodes[0].childNodes[0].attributes.name.value).toContain("answer-radio");
  });

  it('calls the answerSelected function when clicked', () => {
    spyOn(result.originalComponent(), "answerSelected");
    var checkbox = TestUtils.findRenderedDOMComponentWithTag(result, 'input');
    TestUtils.Simulate.click(checkbox);
    expect(result.originalComponent().answerSelected).toHaveBeenCalled();
  });

});
