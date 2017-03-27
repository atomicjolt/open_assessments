import _                          from 'lodash';
import { getQbankMediaType }   from '../../constants/genus_types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {

    case 'GET_MEDIA_DONE': {
      const newState = _.cloneDeep(state);
      const bankId = action.original.bankId;

      if (!newState[bankId]) {
        newState[bankId] = {};
      }
      _.forEach(action.payload, (media) => {
        const type = getQbankMediaType(_.get(media, 'assetContents[0].genusTypeId'));
        if (!newState[bankId][type]) {
          newState[bankId][type] = {};
        }
        newState[bankId][type][media.id] = media;
      });
      return newState;
    }
    default:
      return state;
  }
};
