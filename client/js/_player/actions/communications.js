"use strict";

import wrapper from '../constants/wrapper';

const constants = [
  "SEND_SIZE",
  "SCROLL_PARENT_TO_TOP",
  "LTI_NAVIGATE_HOME",
  "LTI_NAVIGATE_NEXT",
  "LTI_NAVIGATE_PREVIOUS",
  "HIDE_LMS_NAVIGATION",
  "SHOW_LMS_NAVIGATION",
  "AVAILABLE_LOCALES"
];

const requests = [];

export const Constants = wrapper(constants, requests);

export const sendSize = () => {
  return {
    type: Constants.SEND_SIZE
  };
};

export const scrollParentToTop = () => {
  return {
    type: Constants.SCROLL_PARENT_TO_TOP
  };
};

export const navigateHome = () => {
  return {
    type: Constants.LTI_NAVIGATE_HOME
  };
};

export const navigateNext = () => {
  return {
    type: Constants.LTI_NAVIGATE_NEXT
  };
};

export const navigatePrevious = () => {
  return {
    type: Constants.LTI_NAVIGATE_PREVIOUS
  };
};

export const hideLMSNavigation = () => {
  return {
    type: Constants.HIDE_LMS_NAVIGATION
  };
};

export const showLMSNavigation = () => {
  return {
    type: Constants.SHOW_LMS_NAVIGATION
  };
};

export const availableLocales = () => {
  return {
    type: Constants.AVAILABLE_LOCALES
  };
};
