import React          from 'react';
import TestUtils      from 'react-addons-test-utils';
import Settings       from './settings';
import types          from '../../../../../constants/question_types';
import Stub           from '../../../../../../specs_support/stub';

describe('settings component', () => {
  let props;
  let result;
  let itemUpdated;

  beforeEach(() => {
    itemUpdated = false;
    props = {
      id: '7',
      defaultName: 'IMALITTLESPEC',
      type: '',
      language: 'hindi',
      updateItem: () => {itemUpdated = true},
      makeReflection: () => {},
      maintainOrder: false,
      multipleAnswer: false,
      reflection: false,
    };
    result = TestUtils.renderIntoDocument(<Stub><Settings {...props} /></Stub>);
  });

  it('renders an input and a select', () => {
    const input = TestUtils.findRenderedDOMComponentWithTag(
      result,
      'input',
    );
    expect(input).toBeDefined();
    const select = TestUtils.findRenderedDOMComponentWithTag(
      result,
      'input',
    );
    expect(select).toBeDefined();
  });

  it('renders more inputs when extraOptionTypes has props.type', () => {
    props.type = 'multipleChoice';
    result = TestUtils.renderIntoDocument(<Stub><Settings {...props} /></Stub>);
    const inputs = TestUtils.scryRenderedDOMComponentsWithTag(
      result,
      'input',
    );
    expect(inputs.length).toBe(4);
  });

  it('first input calls props.updateItem and has a defaultName', () => {
    expect(itemUpdated).toBeFalsy();
    const input = TestUtils.findRenderedDOMComponentWithClass(
      result,
      'author--c-text-input'
    );
    expect(input.defaultValue).toBe('IMALITTLESPEC');
    TestUtils.Simulate.blur(input);
    expect(itemUpdated).toBeTruthy();
  });

  it('has hindi as the select value', () => {
    expect(itemUpdated).toBeFalsy();
    const select = TestUtils.findRenderedDOMComponentWithTag(
      result,
      'select',
    );
    expect(select.name).toBe('');
    expect(select.value).toBe('hindi');
    TestUtils.Simulate.change(select);
    expect(itemUpdated).toBeTruthy();
  });

});
