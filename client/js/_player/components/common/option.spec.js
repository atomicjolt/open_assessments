import React              from 'react';
import ReactDOM           from 'react-dom';
import TestUtils          from 'react-addons-test-utils';
import Option             from './option';

describe('option', function() {

  var item = {
    id: 1,
    material: ["test", "test1", "test2"]
  };
  var result = TestUtils.renderIntoDocument(<Option item={item} name="answer-option" />);

  it('renders the dropdown items', function() {
    expect(ReactDOM.findDOMNode(result).textContent).toContain(item.material[0]);
    expect(ReactDOM.findDOMNode(result).textContent).toContain(item.material[1]);
    expect(ReactDOM.findDOMNode(result).textContent).toContain(item.material[2]);
  });

  it('calls the answerSelected function when change', () => {
    spyOn(result, "answerSelected");
    var select = TestUtils.findRenderedDOMComponentWithTag(result, 'select');
    TestUtils.Simulate.change(select);
    expect(result.answerSelected).toHaveBeenCalled();
  });

});
