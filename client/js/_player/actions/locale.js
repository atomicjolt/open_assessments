import wrapper from '../../constants/wrapper';


const constants = [
  'LOCALE_SET'
];

const requests = [];

export const Constants = wrapper(constants, requests);


/**
 * Sets the given locale, overriding any setting from URL params or JS params.
 * Expects `locale` to be a 2-letter code.
 */
export function setLocale(locale) {
  return {
    type    : Constants.LOCALE_SET,
    apiCall : true,
    locale
  };
}
