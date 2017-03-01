import React        from 'react';
import TestUtils    from 'react-addons-test-utils';
import Stub         from '../../../../../specs_support/stub';
import Option  from './multiple_choice_option';

describe('Multiple Choice Option', () => {
  let result;
  let props;
  let updatedChoice = {};
  let moveChoice = '';

  beforeEach(() => {
    props = {
      isCorrect: true,
      key: 'assessmentChoice_1',
      updateChoice: attr =>  { updatedChoice = attr; },
      text: 'This is dummy text',
      deleteChoice: (e) => { moveChoice = e.target.innerText; },
      shuffle: false,
      moveUp: (e) => { moveChoice = e.target.innerText; },
      moveDown: (e) => { moveChoice = e.target.innerText; },
      isActive: true,
    };
    result = TestUtils.renderIntoDocument(<Stub><Option {...props} /></Stub>);
  });

  it('checks if input.checked is true', () => {
    const input = TestUtils.scryRenderedDOMComponentsWithTag(result, 'input')[0];
    expect(input.checked).toBeTruthy();
  });

  it('clicks the first input', () => {
    const input = TestUtils.scryRenderedDOMComponentsWithTag(result, 'input')[0];
    expect(updatedChoice.isCorrect).toBe(undefined);
    TestUtils.Simulate.click(input);
    expect(updatedChoice.isCorrect).toBe(true);
  });

  it('checks defaultValue of second input', () => {
    const input = TestUtils.scryRenderedDOMComponentsWithTag(result, 'input')[1];
    expect(input.defaultValue).toBe('This is dummy text');
  });

  it('clicks the second input', () => {
    const input = TestUtils.scryRenderedDOMComponentsWithTag(result, 'input')[1];
    TestUtils.Simulate.blur(input);
    expect(updatedChoice.text).toBe('This is dummy text');
  });

  it('finds all buttons when shuffle is true', () => {
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    expect(buttons.length).toBe(3);
  });

  it('finds only one button', () => {
    props.shuffle = true;
    result = TestUtils.renderIntoDocument(<Stub><Option {...props} /></Stub>);
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    expect(buttons.length).toBe(1);
  });

  it('finds button and clicks it upward', () => {
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    TestUtils.Simulate.click(buttons[0]);
    expect(moveChoice).toBe('arrow_upward');
  });

  it('finds button and clicks it downward', () => {
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    TestUtils.Simulate.click(buttons[1]);
    expect(moveChoice).toBe('arrow_downward');
  });

  it('finds button and clicks it close', () => {
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    TestUtils.Simulate.click(buttons[2]);
    expect(moveChoice).toBe('close');
  });

  it('isActive??', () => {
    let div = TestUtils.scryRenderedDOMComponentsWithClass(result, 'c-input c-input-label--left c-feedback');
    expect(div).toBeDefined();

    props.isActive = false;
    result = TestUtils.renderIntoDocument(<Stub><Option {...props} /></Stub>);
    div = TestUtils.scryRenderedDOMComponentsWithClass(result, 'c-input c-input-label--left c-feedback');
    expect(div.length).toBe(0);
  });

});
