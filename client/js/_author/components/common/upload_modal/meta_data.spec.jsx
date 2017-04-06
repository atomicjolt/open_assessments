import React              from 'react';
import TestUtils          from 'react-addons-test-utils';
import Stub               from '../../../../../specs_support/stub';
import Metadata         from './meta_data';

describe('Metadata', () => {
  let result;
  let props;
  let updater;

  beforeEach(() => {
    updater = false;

    props = {
     updateMetadata: () => { updater = true; },
     metadataTypes: ['copyright', 'altText', 'license'],
     metaData: {
      id: 'mediaId',
      altText: {
        text: 'salty alty text',
      },
      description: {
        text: 'description text',
      },
      copyright: {
        text: 'copyright stuff',
      },
      license: {
        text: 'silly license text',
      },
    },
  };

    result = TestUtils.renderIntoDocument(<Stub><Metadata {...props} /></Stub>);
  });

  it('it should not be active tr style', () => {
    let labels = TestUtils.scryRenderedDOMComponentsWithTag(result, 'label');
    //should be 4 total in spec
    // debugger
    expect(labels[1].textContent).toBe('Copyright');
  });
  

});
