import wrapper from '../../constants/wrapper';

// Local actions
const actions = [];

// Actions that make an api request
const requests = [
  'UPLOAD_IMAGE',
];

export const Constants = wrapper(actions, requests);

export function uploadImage(file, resolve, bankId) {
  return {
    bankId,
    file,
    resolve,
    apiCall : true,
    type    : Constants.UPLOAD_IMAGE,
  };
}
