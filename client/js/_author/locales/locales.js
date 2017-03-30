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

export function availableLocales() {
  return strings.getAvailableLanguages().map(code => [code, locales[code].name]);
}

export default strings;
