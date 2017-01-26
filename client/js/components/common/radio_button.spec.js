import React              from 'react';
import ReactDOM           from 'react-dom';
import TestUtils          from 'react-addons-test-utils';
import RadioButton        from './radio_button';
import { CORRECT, INCORRECT, UNGRADED } from "../assessments/universal_input";

describe('radio button', function() {

  var item = {
    id: "1",
    material: "The radio button label"
  };

  var props = {
    item,
    name         : "answer-radio",
    selectAnswer : () => {},
    id           : item.id,
    gradeState   : UNGRADED
  };

  var result;
  var subject;

  beforeEach(function(){
    spyOn(props, "selectAnswer");
    
    result = TestUtils.renderIntoDocument(<RadioButton {...props} />);
    subject = ReactDOM.findDOMNode(result);
  });

  it('renders the radio button label', function() {
    expect(subject.textContent).toContain(item.material);
  });

  it('renders input attributes', function() {
    expect(subject.innerHTML).toContain('type="radio"');
  });

  it('calls the answerSelected function on click', () => {
    var radio = TestUtils.findRenderedDOMComponentWithTag(result, 'input');
    TestUtils.Simulate.change(radio);

    expect(props.selectAnswer).toHaveBeenCalled();
  });

});
