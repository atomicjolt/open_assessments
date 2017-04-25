import React      from 'react';
import ReactDOM   from 'react-dom';
import TestUtils  from 'react-addons-test-utils';

import Button     from './button';

describe('button', () => {

  it('calls onClick when button is clicked', () => {
    var props = {
      onClick:() => {},
      buttonClass: "myBtn"
    };
    spyOn(props, "onClick");
    var result = TestUtils.renderIntoDocument(<Button {...props} />);
    var button = TestUtils.findRenderedDOMComponentWithClass(result, 'myBtn');
    TestUtils.Simulate.click(button);

    expect(props.onClick).toHaveBeenCalled();
  });

  it('adds button class', () => {
    var props = {
      buttonClass:"test-type"
    };
    var result = TestUtils.renderIntoDocument(<Button {...props} />);
    var subject = ReactDOM.findDOMNode(result);

    expect(subject.outerHTML).toContain('test-type');
  });

  it('renders button text', () => {
    var props = {
      buttonText:"Howdy",
      buttonClass:'test-type',
    };
    var result = TestUtils.renderIntoDocument(<Button {...props} />);
    var subject = ReactDOM.findDOMNode(result);

    expect(subject.outerHTML).toContain('Howdy');
  });

  it('renders child components', () => {
    var props = {
      buttonClass:"test-type"
    };
    var result = TestUtils.renderIntoDocument(
      <Button buttonClass='test-type'>
        <p>Hola</p>
      </Button>
    );
    var subject = ReactDOM.findDOMNode(result);

    expect(subject.innerHTML).toContain('Hola');
  });
});
