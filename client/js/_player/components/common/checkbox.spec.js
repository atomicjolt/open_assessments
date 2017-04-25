import React              from 'react';
import ReactDOM           from 'react-dom';
import TestUtils          from 'react-addons-test-utils';
import Checkbox           from './checkbox';
import { CORRECT, INCORRECT, UNGRADED } from "../assessments/universal_input";

describe('checkbox', function() {

  var item = {
    id: "1",
    material: "Checkbox content"
  };

  var props = {
    item,
    name         : "answer-checkbox",
    selectAnswer : () => {},
    id           : item.id,
    gradeState   : UNGRADED
  };

  var result;
  var subject;

  beforeEach(function(){
    spyOn(props, "selectAnswer");

    result = TestUtils.renderIntoDocument(<Checkbox {...props} />);
    subject = ReactDOM.findDOMNode(result);
  });

  it('renders the radio button label', function() {
    expect(subject.textContent).toContain(item.material);
  });

  it('renders input attributes', function() {
    expect(subject.innerHTML).toContain('type="checkbox"');
  });

  it('calls the answerSelected function on click', () => {
    var checkbox = TestUtils.findRenderedDOMComponentWithTag(result, 'input');
    TestUtils.Simulate.change(checkbox);

    expect(props.selectAnswer).toHaveBeenCalled();
  });
});
