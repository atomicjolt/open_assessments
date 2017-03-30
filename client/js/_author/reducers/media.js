import _                          from 'lodash';
import { getQbankMediaType }   from '../../constants/genus_types';

const initialState = {
  loading: true,
  image: {},
  audio: {},
  video: {},
};

export default (state = initialState, action) => {
  switch (action.type) {

    case 'GET_MEDIA_DONE': {
      const newState = _.cloneDeep(state);
      newState.loading = false;
      _.forEach(action.payload, (media) => {
        const type = getQbankMediaType(_.get(media, 'assetContents[0].genusTypeId'));
        if (type) {
          newState[type][media.id] = media;
        }
      });
      return newState;
    }
    default:
      return state;
  }
};
