import React              from 'react';
import TestUtils          from 'react-addons-test-utils';
import Stub               from '../../../../../specs_support/stub';
import Metadata         from './meta_data';

describe('Metadata', () => {
  let result;
  let props;

  beforeEach(() => {

    props = {
      metadataTypes: ['copyright', 'altText', 'license'],
      metaData: {
        id: 'mediaId',
        altText: {
          text: 'salty alty text',
        },
        description: 'description text',
        copyright: {
          text: 'copyright stuff',
        },
        license: {
          text: 'silly license text',
        },
      },

      updateMetadata: () => {},
    };

    result = TestUtils.renderIntoDocument(<Stub><Metadata {...props} /></Stub>);
  });

  it('it should not be active tr style', () => {
    const labels = TestUtils.scryRenderedDOMComponentsWithTag(result, 'label');
    expect(labels[0].textContent).toBe('Description');
  });

});
