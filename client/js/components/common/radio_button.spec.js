import React              from 'react';
import ReactDOM           from 'react-dom';
import TestUtils          from 'react/lib/ReactTestUtils';
import RadioButton        from './radio_button';

describe('radio button', function() {

  var item = {
    id: 1,
    material: "The radio button label"
  };
  var selectAnswer = () => {};

  var result = TestUtils.renderIntoDocument(<RadioButton
                                              item={item}
                                              name="answer-radio"
                                              selectAnswer={selectAnswer}/>);
  var subject = ReactDOM.findDOMNode(result);

  it('renders the radio button label', function() {
    expect(subject.textContent).toContain(item.material);
  });

  it('renders input attributes', function() {
    expect(subject.innerHTML).toContain('type="radio"');
  });

  it('calls the answerSelected function on click', () => {
    spyOn(result, "selectAnswer");
    var radio = TestUtils.findRenderedDOMComponentWithTag(result, 'input');
    TestUtils.Simulate.click(radio);
    expect(result.selectAnswer).toHaveBeenCalled();
  });

});
