import _ from 'lodash';
import { Constants as AssetConstants } from '../../actions/qbank/assets';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {

    case AssetConstants.UPLOAD_MEDIA_DONE: {
      const newState = _.cloneDeep(state);
      if (action.error) {
        newState[action.original.guid] = { error: action.error };
        return newState;
      }

      newState[mediaGuid] = {...action.payload, autoplay: true};

      if (!_.isEmpty(action.payload.transcript)) {
        _.each(transcriptGuids, (guid) => {
          newState[guid] = action.payload.transcript; // later we need to look up by language :(
        });
      }

      if (!_.isEmpty(action.payload.vtt)) {
        _.each(vttGuids, (guid) => {
          newState[guid] = action.payload.vtt; // later we need to look up by language :(
        });
      }

      return newState;
    }

    default:
      return state;

  }
};
