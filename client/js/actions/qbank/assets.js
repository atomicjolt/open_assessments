import wrapper from '../../constants/wrapper';

// Local actions
const actions = [];

// Actions that make an api request
const requests = [
  'UPLOAD_MEDIA',
  'ADD_MEDIA_TO_QUESTION',
];

export const Constants = wrapper(actions, requests);

export function uploadMedia(file, guid, uploadScopeId, bankId) {
  // TODO: the formData implementation should probably move to the reducer
  const formData = new FormData();
  formData.append('inputFile', file);
  formData.append('returnUrl', true);
  formData.append('createNew', true);
  return {
    bankId,
    uploadScopeId,
    file,
    guid,
    apiCall: true,
    type: Constants.UPLOAD_MEDIA,
    body: formData,
    timeout: 1000000,
  };
}

export function addMediaToQuestion(file, guid, uploadScopeId, bankId, itemId, where) {
  return {
    bankId,
    uploadScopeId,
    file,
    guid,
    itemId,
    where,
    apiCall: true,
    type: Constants.ADD_MEDIA_TO_QUESTION,
    body: file,
    timeout: 1000000,
  };
}
