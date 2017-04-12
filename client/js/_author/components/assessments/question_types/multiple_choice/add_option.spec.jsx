import React      from 'react';
import TestUtils  from 'react-addons-test-utils';
import AddOption  from './add_option';
import Stub       from '../../../../../../specs_support/stub';

describe('addOption component', () => {
  let props;
  let result;
  let choiceUpdated;

  beforeEach(() => {
    choiceUpdated = false;
    props = {
      createChoice: () => { choiceUpdated = true; },
    };
    result = TestUtils.renderIntoDocument(<Stub><AddOption {...props} /></Stub>);
  });

  it('renders 2 labels', () => {
    const labels = TestUtils.scryRenderedDOMComponentsWithTag(result, 'label');
    expect(labels.length).toBe(2);
  });

  it('renders 2 inputs', () => {
    const inputs = TestUtils.scryRenderedDOMComponentsWithTag(result, 'input');
    expect(inputs.length).toBe(2);
  });

  it('calls props.createChoice', () => {
    const clickableDiv = TestUtils.findRenderedDOMComponentWithClass(
      result,
      'au-c-answer--add',
    );
    expect(clickableDiv).toBeDefined();
    expect(choiceUpdated).toBeFalsy();
    TestUtils.Simulate.click(clickableDiv);
    expect(choiceUpdated).toBeTruthy();
  });
});
