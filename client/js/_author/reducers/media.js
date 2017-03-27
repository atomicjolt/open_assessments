import _                          from 'lodash';
import { getQbankMediaType }   from '../../constants/genus_types';

// Leave this empty. It will hold assessments by bank id. IE `state[someId] = {a_bank}`
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
