import _                        from 'lodash';
import { getQbankMediaType }    from '../../../../constants/genus_types'

export default function media(mediaData) {
  const media = {
    image: {},
    audio: {},
    video: {},
  };
  _.each(mediaData, (data) => {
    const newMedia = {
      id: data.id,
      type: '',
      url: '',
      altText: {},
      description: {},
      license: '',
      copyright: '',
      original: data,
    };
    _.each(data.assetContents, (content) => {
      const type = getQbankMediaType(content.genusTypeId);
      switch (type) {
        case 'image':
        case 'video':
        case 'audio':
          newMedia.type = type;
          newMedia.url = content.url;
          break;
        case 'altText':
          newMedia.altText = content.altText;
          break;
        case 'description':
          newMedia.description = content.description;
          break;
        case 'vtt':
          newMedia.vtt = content.vtt;
          break;
        case 'transcript':
          newMedia.transcript = content.transcript;
          break;
        default:
          console.log(content.genusTypeId);
          break;
      }
    });
    if (newMedia.type) {
      media[newMedia.type][newMedia.id] = newMedia;
    }
  });
  return media;
}
