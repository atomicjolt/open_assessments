import React              from 'react';
import ReactDOM           from 'react-dom';
import TestUtils          from 'react/lib/ReactTestUtils';
import ShortAnswer        from './short_answer';

fdescribe('short_answer', function() {
  var props = {
    selectAnswer : () => {},
  };

  var result;
  var subject;

  beforeEach(function(){
    spyOn(props, "selectAnswer");

    result = TestUtils.renderIntoDocument(<ShortAnswer {...props} />);
    subject = ReactDOM.findDOMNode(result);
  });

  it('calls selectAnswer on blur', () => {
    result.setState({input:"howdy"});
    TestUtils.Simulate.blur(subject);

    expect(props.selectAnswer).toHaveBeenCalledWith("howdy");
  });

  it('sets state on change', () => {
    result.setState({input:""});
    TestUtils.Simulate.change(subject, {target:{value:"howdy partner"}});

    expect(result.state.input).toEqual("howdy partner");
  });

});
