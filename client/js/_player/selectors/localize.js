import strings from '../locales/locales';

/**
 * Returns localized strings based on 'locale' setting
 */
export default function localizeStrings(state, props) {
  const lang = state.locale || state.settings.locale || 'en';
  strings.setLanguage(lang);
  return strings;
}
