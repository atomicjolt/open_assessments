import strings from "../locales/locales";

/**
 * Returns localized strings based on 'locale' setting
 */
export function localizeStrings(state, props) {
  var lang = state.locale || state.settings.locale || "en";
  strings.setLanguage(lang);
  return strings;
};
