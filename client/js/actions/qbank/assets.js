import wrapper from '../../constants/wrapper';

// Local actions
const actions = [];

// Actions that make an api request
const requests = [
  'UPLOAD_MEDIA',
  'ADD_MEDIA_TO_QUESTION',
];

export const Constants = wrapper(actions, requests);

export function uploadMedia(file, guid, bankId, metaData = {}) {
  // TODO: the formData implementation should probably move to the reducer
  return {
    bankId,
    file,
    guid,
    metaData: metaData,
    apiCall: true,
    type: Constants.UPLOAD_MEDIA,
    body: file,
    timeout: 1000000,
  };
}

export function addMediaToQuestion(file, guid, bankId, itemId, where, metaData, newMedia) {
  return {
    file,
    guid,
    bankId,
    itemId,
    where,
    metaData,
    newMedia,
    apiCall: true,
    type: Constants.ADD_MEDIA_TO_QUESTION,
    body: file,
    timeout: 1000000,
  };
}
