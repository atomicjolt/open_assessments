import React              from 'react';
import TestUtils          from 'react-addons-test-utils';
import Stub               from '../../../../specs_support/stub';
import BankIcon           from './bank_icon';

describe('Bank Icon', () => {
  let result;

  it('returns a folder icon', () => {
    result = TestUtils.renderIntoDocument(<Stub><BankIcon type="Bank" /></Stub>);
    let item = TestUtils.findRenderedDOMComponentWithTag(result, 'i');
    expect(item.textContent).toContain('folder');

    result = TestUtils.renderIntoDocument(<Stub><BankIcon type="OsidNode" /></Stub>);
    item = TestUtils.findRenderedDOMComponentWithTag(result, 'i');
    expect(item.textContent).toContain('folder');
  });

  it('returns a page icon', () => {
    result = TestUtils.renderIntoDocument(<Stub><BankIcon type="Assessment" /></Stub>);
    const item = TestUtils.findRenderedDOMComponentWithTag(result, 'i');
    expect(item.textContent).toContain('description');
  });

  it('returns a cloud up icon', () => {
    result = TestUtils.renderIntoDocument(<Stub><BankIcon type="Publish" /></Stub>);
    const item = TestUtils.findRenderedDOMComponentWithTag(result, 'i');
    expect(item.textContent).toContain('cloud_upload');
  });

  it('returns a cloud down icon', () => {
    result = TestUtils.renderIntoDocument(<Stub><BankIcon type="Published" /></Stub>);
    const item = TestUtils.findRenderedDOMComponentWithTag(result, 'i');
    expect(item.textContent).toContain('cloud_done');
  });

});
