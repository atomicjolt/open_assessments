"use strict";

import wrapper from '../constants/wrapper';


const constants = [
  "LOCALE_SET"
];

const requests = [];

export const Constants = wrapper(constants, requests);


export function setLocale(locale) {
  return {
    type: Constants.LOCALE_SET,
    locale
  };
};
