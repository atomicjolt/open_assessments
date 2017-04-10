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
  return {
    bankId,
    file,
    guid,
    metaData,
    apiCall: true,
    type: Constants.UPLOAD_MEDIA,
    body: file,
    timeout: 20000,
  };
}

export function addMediaToQuestion(file, bankId, itemId, where, metaData, newMedia) {
  return {
    bankId,
    file,
    itemId,
    where,
    metaData,
    newMedia,
    apiCall: true,
    type: Constants.ADD_MEDIA_TO_QUESTION,
    body: file,
    timeout: 20000,
  };
}
