import wrapper from '../../constants/wrapper';

export const Constants = wrapper(["APP_DISPLAY_ERROR"], []);

export function displayError(message, error) {
  return {
    type: Constants.APP_DISPLAY_ERROR,
    message,
    error
  };
}
