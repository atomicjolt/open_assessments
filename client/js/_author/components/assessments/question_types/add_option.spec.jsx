import React      from 'react';
import TestUtils  from 'react-addons-test-utils';
import AddOption  from './add_option';
import Stub       from '../../../../../specs_support/stub'

fdescribe('Update Choice working', () => {
  let result;
  let props;
  let called = false

  beforeEach(() => {
    props = {
      updateChoice: () => called = !called,
    };

    result = TestUtils.renderIntoDocument(<Stub><AddOption {...props} /></Stub>);
  });

  it('updates choice', () => {
    const div = TestUtils.findRenderedDOMComponentWithClass(result, 'c-answer c-answer--add');
    TestUtils.Simulate.click(div);
    expect(called).toBeTruthy();
  });
  //
  // it('sets default settings on new assessments', () => {
  //   const button = TestUtils.findRenderedDOMComponentWithClass(result, 'c-btn--maroon');
  //   TestUtils.Simulate.click(button);
  //   expect(called.genusTypeId).toBeDefined();
  //   expect(called.genusTypeId).toBe('item-genus-type%3Aqti-choice-interaction%40ODL.MIT.EDU');
  //   expect(called.name).toBe('');
  //   expect(called.language).toBe('english');
  // });
  //
  // it('sets name on new assessments', () => {
  //   const input = TestUtils.findRenderedDOMComponentWithClass(result, 'c-text-input');
  //   const button = TestUtils.findRenderedDOMComponentWithClass(result, 'c-btn--maroon');
  //   TestUtils.Simulate.change(input, { target: { value: 'tacos' } });
  //   TestUtils.Simulate.click(button);
  //   expect(called.name).toBe('tacos');
  // });
  //
  // it('sets type on new assessments', () => {
  //   const input = TestUtils.scryRenderedDOMComponentsWithTag(result, 'select')[0];
  //   const button = TestUtils.findRenderedDOMComponentWithClass(result, 'c-btn--maroon');
  //   TestUtils.Simulate.change(input, { target: { value: 'item-genus-type%3Aqti-choice-interaction%40ODL.MIT.EDU' } });
  //   TestUtils.Simulate.click(button);
  //   expect(called.genusTypeId).toBe('item-genus-type%3Aqti-choice-interaction%40ODL.MIT.EDU');
  // });
  //
  // it('sets language on new assessments', () => {
  //   const input = TestUtils.scryRenderedDOMComponentsWithTag(result, 'select')[1];
  //   const button = TestUtils.findRenderedDOMComponentWithClass(result, 'c-btn--maroon');
  //   TestUtils.Simulate.change(input, { target: { value: 'french' } });
  //   TestUtils.Simulate.click(button);
  //   expect(called.language).toBe('french');
  // });

});
