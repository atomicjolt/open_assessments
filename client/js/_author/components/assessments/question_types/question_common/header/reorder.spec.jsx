import React         from 'react';
import TestUtils     from 'react-addons-test-utils';
import _             from 'lodash';
import Stub         from '../../../../../../../specs_support/stub';
import ReorderHeader from './reorder';

describe('reorder question header', () => {
  let result;
  let props;
  let called;

  ReorderHeader.prototype.componentDidMount = function componentDidMount() {};

  beforeEach(() => {
    called = false;
    props = {
      moveUp: () => { called = true; },
      moveDown: () => { called = true; },
      toggleReorder: () => { called = true; },
      topItem: false,
      bottomItem: false,
    };
    result = TestUtils.renderIntoDocument(<Stub><ReorderHeader {...props} /></Stub>);
  });

  it('toggles reordering', () => {
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    TestUtils.Simulate.click(_.last(buttons));
    expect(called).toBeTruthy();
  });

  it('calls move up', () => {
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    TestUtils.Simulate.click(buttons[0]);
    expect(called).toBeTruthy();
  });

  it('calls move down', () => {
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    TestUtils.Simulate.click(buttons[1]);
    expect(called).toBeTruthy();
  });

  it('hides nothing', () => {
    const buttons = TestUtils.scryRenderedDOMComponentsWithClass(result, 'is-hidden');
    expect(_.isEmpty(buttons)).toBeTruthy();
  });

  it('hides the top button', () => {
    props.topItem = true;
    result = TestUtils.renderIntoDocument(<Stub><ReorderHeader {...props} /></Stub>);
    const button = TestUtils.findRenderedDOMComponentWithClass(result, 'is-hidden');
    expect(button).toBeDefined();
  });

  it('hides the bottom button', () => {
    it('hides the top button', () => {
      props.bottomItem = true;
      result = TestUtils.renderIntoDocument(<Stub><ReorderHeader {...props} /></Stub>);
      const button = TestUtils.findRenderedDOMComponentWithClass(result, 'is-hidden');
      expect(button).toBeDefined();
    });
  });
});
