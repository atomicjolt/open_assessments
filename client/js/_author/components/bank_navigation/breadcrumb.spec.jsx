import React              from 'react';
import TestUtils          from 'react-addons-test-utils';
import Stub               from '../../../../specs_support/stub';
import Breadcrumbs       from './breadcrumb';

describe('breadcrumbs', () => {
  let result;
  let props;
  let updater;

  beforeEach(() => {
    updater = false;
    props = {
      key: 'folder_11235',
      id: '123',
      name: 'TestCrumbs',
      current: false,
      updatePath: () => { updater = true; },
      getBankChildren: () => {}
    };

    result = TestUtils.renderIntoDocument(<Stub><Breadcrumbs {...props} /></Stub>);
  });

  it('it determines button style', () => {
    let button = TestUtils.findRenderedDOMComponentWithTag(result, 'button');
    expect(button.className).not.toContain('is-active');

    props.current = true;
    result = TestUtils.renderIntoDocument(<Stub><Breadcrumbs {...props} /></Stub>);
    button = TestUtils.findRenderedDOMComponentWithTag(result, 'button');
    expect(button.className).toContain('is-active');
  });

  it('it determines button style', () => {
    const button = TestUtils.findRenderedDOMComponentWithTag(result, 'button');
    expect(button.textContent).toBe('TestCrumbs');
  });

  it('it clicks button for updatePath', () => {
    const button = TestUtils.findRenderedDOMComponentWithTag(result, 'button');
    TestUtils.Simulate.click(button);
    expect(updater).toBeTruthy();
  });

});
