import { Constants as AssetConstants } from '../../actions/qbank/assets';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {

    case AssetConstants.UPLOAD_IMAGE_DONE: {
      const newState = _.cloneDeep(state);
      newState[action.original.guid] = action.payload.assetContents[0].url;

      return newState;
    }

    default:
      return state;

  }
};
