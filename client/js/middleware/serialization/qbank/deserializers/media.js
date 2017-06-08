import _                        from 'lodash';
import { getQbankMediaType }    from '../../../../constants/genus_types';

export function deserializeSingleMedia(asset, autoPlay = null) {
  const newMedia = {
    id: asset.id,
    type: '',
    url: '',
    autoPlay,
    altText: {},
    description: asset.description,
    license: asset.license,
    copyright: asset.copyright,
    original: asset,
    assetContentId: '',
    extension: '',
  };

  _.each(asset.assetContents, (content) => {
    const type = getQbankMediaType(content.genusTypeId);
    switch (type) {
      case 'image':
      case 'video':
      case 'audio': {
        // we need the file extension for attempted mime type, so we extract it
        // out of the genusTypeId
        const regexp = /%3A(.*)%40/;
        newMedia.extension = _.get(regexp.exec(content.genusTypeId), '[1]', '');

        newMedia.type = type;
        newMedia.url = content.url;
        newMedia.assetContentId = content.id;
        break;
      }
      case 'altText':
        newMedia.altText = content.altText;
        newMedia.altTexts = content.altTexts;
        break;
      case 'description':
        newMedia.description = content.mediaDescription;
        break;
      case 'vtt':
        newMedia.vtt = {
          ...content,
          assetContentId: content.id,
          id: content.assetId,
        };
        break;
      case 'transcript':
        newMedia.transcript = {
          ...content,
          assetContentId: content.id,
          id: content.assetId,
        };
        break;
      default:
        console.log(content.genusTypeId);
        break;
    }
  });

  return newMedia;
}


export function deserializeMedia(mediaData) {
  const newMediaData = {
    image: {},
    audio: {},
    video: {},
  };
  _.each(mediaData, (data) => {
    const newMedia = deserializeSingleMedia(data);
    if (newMedia.type) {
      newMediaData[newMedia.type][newMedia.id] = newMedia;
    }
  });
  return newMediaData;
}
