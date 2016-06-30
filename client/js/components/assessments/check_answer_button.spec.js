import React      from 'react';
import ReactDOM   from 'react-dom';
import TestUtils  from 'react/lib/ReactTestUtils';

import CheckAnswerButton from './check_answer_button';

describe('check answer button', () => {

  it('calls checkAnswers when checkAnswers button clicked', () => {
    var props = {
      checkAnswers:() => {}
    };
    spyOn(props, "checkAnswers");
    var result = TestUtils.renderIntoDocument(<CheckAnswerButton {...props} />);
    var button = TestUtils.findRenderedDOMComponentWithClass(result, 'c-btn--check-answer');
    TestUtils.Simulate.click(button);

    expect(props.checkAnswers).toHaveBeenCalled();
  });

});
