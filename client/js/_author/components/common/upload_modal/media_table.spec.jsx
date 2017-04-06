import React              from 'react';
import TestUtils          from 'react-addons-test-utils';
import Stub               from '../../../../../specs_support/stub';
import MediaTable         from './media_table';

describe('mediaTable', () => {
  let result;
  let props;
  let updater;

  beforeEach(() => {
    updater = false;

    props = {
      media: [{
        url: 'coolestUrlEver',
        id: 'mediaId',
        altText: {
          text: 'salty alty text',
        },
        description: {
          text: 'description text',
        },
        license: {
          text: 'silly license text',
        },
      },
      {
        id: 'mediaId2',
        altText: {
          text: 'salty alty text2',
        },
        description: {
          text: 'description text2',
        },
        license: {
          text: 'silly license text2',
        },
      }],
      selectMedia: (item) => { updater = true; },
      selectedMediaId: 'mediaId2'
    };


    result = TestUtils.renderIntoDocument(<Stub><MediaTable {...props} /></Stub>);
  });

  it('it should not be active tr style', () => {
    let tr = TestUtils.scryRenderedDOMComponentsWithTag(result, 'tr');
    expect(tr[0].className).toBe('');
  });

  it('it should have is-active tr style', () => {
    let tr = TestUtils.scryRenderedDOMComponentsWithTag(result, 'tr');
    expect(tr[1].className).toBe('is-active');
  });

  it('it should call the selectMedia', () => {
    let tr = TestUtils.scryRenderedDOMComponentsWithTag(result, 'tr');
    expect(updater).toBeFalsy;
    TestUtils.Simulate.click(tr[0]);
    expect(updater).toBeTruthy;
  });

  it('img tag has correct src = "url"', () => {
    let imgs = TestUtils.scryRenderedDOMComponentsWithTag(result, 'img');
    expect(imgs[0].src).toBe('coolestUrlEver');
  });

  it('texts should be good', () => {
    let tds = TestUtils.scryRenderedDOMComponentsWithTag(result, 'td');
    expect(tds[1].textContent).toBe('description text');
    expect(tds[2].textContent).toBe('silly license text');
  });

});
