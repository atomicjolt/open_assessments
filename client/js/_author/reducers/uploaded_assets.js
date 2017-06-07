import _ from 'lodash';
import { Constants as AssetConstants } from '../../actions/qbank/assets';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {

    case AssetConstants.UPLOAD_MEDIA_DONE: {
      const newState = _.cloneDeep(state);
      const { vttGuids, transcriptGuids, mediaGuid } = action.original.fileGuids;
      if (action.error) {
        newState[mediaGuid] = { error: action.error };
        _.each(vttGuids.concat(transcriptGuids), (guid) => {
          newState[guid] = { error: action.error };
        });

        return newState;
      }

      newState[mediaGuid] = action.payload;
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
