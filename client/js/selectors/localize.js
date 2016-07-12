import LocalizedStrings from 'react-localization';
import locales          from '../locales/locales';

export function localizeStrings(state, props){
  var lang = state.settings.locale;
  var strings = new LocalizedStrings(locales());
  strings.setLanguage(lang);
  return strings;
};
