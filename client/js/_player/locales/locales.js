"use strict";

import LocalizedStrings from 'react-localization';

import en     from './en';
import he     from './he';
import hi     from './hi';
import te     from './te';


const locales = {
    ...en,
    ...he,
    ...hi,
    ...te
};
Object.freeze(locales);

const strings = new LocalizedStrings(locales);


/**
 * Returns the available locales as an array, each element of which is an array
 * of 2 elements: the 2-letter code, and the name.
 */
export function availableLocales() {
  return strings.getAvailableLanguages().map((code) => [code, locales[code].name]);
}

export default strings;
