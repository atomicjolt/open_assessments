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

      // debugger;
      newState[action.original.guid] = action.payload;
      newState["Howdy"] = "Hello";
      // TODO should add asset meta as their own files
      //  May have to generate guids?

      return newState;
    }

    default:
      return state;

  }
};
