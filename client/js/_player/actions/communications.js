import wrapper from '../../constants/wrapper';

const constants = [
  'SEND_SIZE',
  'SCROLL_PARENT_TO_TOP',
  'LTI_NAVIGATE_HOME',
  'LTI_NAVIGATE_NEXT',
  'LTI_NAVIGATE_PREVIOUS',
  'HIDE_LMS_NAVIGATION',
  'SHOW_LMS_NAVIGATION',
  'AVAILABLE_LOCALES',
];

const requests = [];

export const Constants = wrapper(constants, requests);

export const sendSize = () => ({ type: Constants.SEND_SIZE });
export const scrollParentToTop = () => ({ type: Constants.SCROLL_PARENT_TO_TOP });
export const navigateHome = () => ({ type: Constants.LTI_NAVIGATE_HOME });
export const navigateNext = () => ({ type: Constants.LTI_NAVIGATE_NEXT });
export const navigatePrevious = () => ({ type: Constants.LTI_NAVIGATE_PREVIOUS });
export const hideLMSNavigation = () => ({ type: Constants.HIDE_LMS_NAVIGATION });
export const showLMSNavigation = () => ({ type: Constants.SHOW_LMS_NAVIGATION });
export const availableLocales = () => ({ type: Constants.AVAILABLE_LOCALES });
