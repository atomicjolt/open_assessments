import React        from 'react';
import TestUtils    from 'react-addons-test-utils';
import Stub         from '../../../../../../specs_support/stub';
import OptionRadio  from './option_radio';

describe('radio component', () => {
  let props;
  let result;
  let choiceUpdated;

  beforeEach(() => {
    choiceUpdated = false;
    props = {
      itemId: '',
      id: '7',
      isCorrect: false,
      updateChoice: () => { choiceUpdated = true; },
    };
    result = TestUtils.renderIntoDocument(<Stub><OptionRadio {...props} /></Stub>);
  });

  it('renders one input to the screen', () => {
    const input = TestUtils.findRenderedDOMComponentWithTag(
      result,
      'input',
    );
    expect(input).toBeDefined();
  });

  it('calls the updateChoice function on change', () => {
    expect(choiceUpdated).toBeFalsy();
    const input = TestUtils.findRenderedDOMComponentWithTag(
      result,
      'input',
    );
    TestUtils.Simulate.change(input);
    expect(choiceUpdated).toBeTruthy();
  });

  it('renders true for checked', () => {
    props.isCorrect = true;
    result = TestUtils.renderIntoDocument(<Stub><OptionRadio {...props} /></Stub>);
    const input = TestUtils.findRenderedDOMComponentWithTag(
      result,
      'input',
    );
    expect(input.checked).toBeTruthy();
  });
});
