import LocalizedStrings from 'react-localization';

import en     from './en';
import hi     from './hi';
import te     from './te';


const locales = {
  ...en,
  ...hi,
  ...te
};
Object.freeze(locales);

const strings = new LocalizedStrings(locales);

export function availableLocales() {
  return strings.getAvailableLanguages().map(code => [code, locales[code].name]);
}

export default strings;
