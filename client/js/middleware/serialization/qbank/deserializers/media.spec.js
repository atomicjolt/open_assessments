import { deserializeSingleMedia }      from './media';

describe('imageSequence', () => {

  let asset;
  let autoPlay;
  let result;

  beforeEach(() => {
    autoPlay = false;
    asset = {
      id: 'myId',
      description: 'really good description',
      license: 'to kill 007',
      copyright: 'copy all over the rights',
      assetContents: [
        {
          id: 'assetContentId',
          genusTypeId: 'asset-content-genus-type%3Apng%40iana.org',
          url: 'https://url_to_test',
        },
        {
          genusTypeId: 'asset-content-genus-type%3Aalt-text%40ODL.MIT.EDU',
          altText: 'bestAltText'
        },
        {
          genusTypeId: 'asset-content-genus-type%3Amedia-description%40ODL.MIT.EDU',
          mediaDescription: 'bestMediaDescription'
        }
      ]
    };

    result = deserializeSingleMedia(asset, autoPlay);
  });


  it('should have correct description', () => {
    expect(result.description).toBe('bestMediaDescription');
  });

  it('should have correct altText', () => {
    expect(result.altText).toBe('bestAltText');
  });

  it('should have correct url', () => {
    expect(result.url).toBe('https://url_to_test');
  });

  it('should have correct bool for autoPlay', () => {
    expect(result.autoPlay).toBeFalsy();
  });
});
