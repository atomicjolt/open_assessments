import { Constants as AssetConstants } from '../../actions/qbank/assets';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {

    case AssetConstants.UPLOAD_IMAGE_DONE: {
      const newState = _.cloneDeep(state);
      const link = _.replace(
        action.payload.assetContents[0].url,
        '/api/v1',
        action.original.apiUrl // the returned url doesn't include the host.
      );
      newState[action.original.guid] = link;

      return newState;
    }

    default:
      return state;

  }
};
