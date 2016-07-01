import React      from 'react';
import ReactDOM   from 'react-dom';
import TestUtils  from 'react/lib/ReactTestUtils';

import Button     from './button';

describe('button', () => {

  it('calls onClick when button is clicked', () => {
    var props = {
      onClick:() => {}
    };
    spyOn(props, "onClick");
    var result = TestUtils.renderIntoDocument(<Button {...props} />);
    var button = TestUtils.findRenderedDOMComponentWithClass(result, 'c-btn');
    TestUtils.Simulate.click(button);

    expect(props.onClick).toHaveBeenCalled();
  });

  it('appends button type to class string', () => {
    var props = {
      buttonType:"test-type"
    };
    var result = TestUtils.renderIntoDocument(<Button {...props} />);
    var subject = ReactDOM.findDOMNode(result);

    expect(subject.outerHTML).toContain('c-btn c-btn--test-type');
  });

  it('renders button text', () => {
    var props = {
      buttonText:"Howdy"
    };
    var result = TestUtils.renderIntoDocument(<Button {...props} />);
    var subject = ReactDOM.findDOMNode(result);

    expect(subject.outerHTML).toContain('Howdy');
  });

  it('renders child components', () => {
    var result = TestUtils.renderIntoDocument(
      <Button>
        <p>Hola</p>
      </Button>
    );
    var subject = ReactDOM.findDOMNode(result);

    expect(subject.innerHTML).toContain('Hola');
  });
});
