"use strict";

import wrapper from '../constants/wrapper';

const constants = [
  "POST_SIZE",
  "SCROLL_PARENT_TO_TOP"
];

const requests = [];

export const Constants = wrapper(constants, requests);

export const postSize = () => {
  return {
    type: Constants.POST_SIZE
  };
};

export const scrollParentToTop = () => {
  return {
    type: Constants.SCROLL_PARENT_TO_TOP
  };
};
