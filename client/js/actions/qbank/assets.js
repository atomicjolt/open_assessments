import wrapper from '../../constants/wrapper';

// Local actions
const actions = [];

// Actions that make an api request
const requests = [
  'UPLOAD_IMAGE',
];

export const Constants = wrapper(actions, requests);

export function uploadImage(file, guid, bankId) {
  const formData = new FormData();
  formData.append('inputFile', file);
  formData.append('returnUrl', true);

  return {
    bankId,
    file,
    guid,
    apiCall: true,
    type: Constants.UPLOAD_IMAGE,
    body: formData
  };
}
