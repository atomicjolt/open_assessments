import wrapper from '../../constants/wrapper';

// Local actions
const actions = [];

// Actions that make an api request
const requests = [
  'UPLOAD_MEDIA',
];

export const Constants = wrapper(actions, requests);

export function uploadMedia(file, guid, uploadScopeId, bankId) {
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
