import React      from 'react';
import TestUtils  from 'react-addons-test-utils';
import Stub       from '../../../../specs_support/stub';
import Heading    from './heading';

jest.mock('../../../libs/assets');

describe('Heading', () => {
  let result;
  let props;

  beforeEach(() => {
    props = {
      view: 'banks',
      path: [],
      updatePath: () => {},
    };

    result = TestUtils.renderIntoDocument(<Stub><Heading {...props} /></Stub>);
  });

  it('has a logo', () => {
    expect(TestUtils.findRenderedDOMComponentWithTag(result, 'img')).toBeDefined();
  });

  it('renders the Bank view content', () => {
    expect(TestUtils.findRenderedDOMComponentWithClass(result, 'au-c-header-bottom')).toBeDefined();
  });

  it('renders children for default view', () => {
    props.view = undefined;
    result = TestUtils.renderIntoDocument(
      <Stub>
        <Heading {...props}>
          <h1>Howdy!</h1>
        </Heading>
      </Stub>
    );

    expect(TestUtils.findRenderedDOMComponentWithTag(result, 'h1')).toBeDefined();
  });
});
