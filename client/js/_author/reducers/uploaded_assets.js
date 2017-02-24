import { Constants as AssetConstants } from '../../actions/qbank/assets';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {

    // TODO: These urls are currently being resolved to the current api url.
    // Verify that when this is deployed, this will still be valid. Otherwise
    // all uploaded assets in authored questions will break.

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
