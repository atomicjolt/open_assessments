import _  from 'lodash';

export const languages = {
  languageTypeId: {
    english: '639-2%3AENG%40ISO',
    hindi: '639-2%3AHIN%40ISO',
    telugu: '639-2%3ATEL%40ISO',
  },
  formatTypeId: 'TextFormats%3APLAIN%40okapia.net',
  scriptTypeId: {
    english: '15924%3ALATN%40ISO',
    hindi: '15924%3ADEVA%40ISO',
    telugu: '15924%3ATELU%40ISO',
  }
};

export function getLanguage(langCode) {
  return _.findKey(languages.languageTypeId, language => langCode === language) || null;
}

export function getScriptTypeId(langCode) {
  return _.findKey(languages.scriptTypeId, language => langCode === language) || null;
}

export function languageFromLocale(locale) {
  switch (locale) {
    case 'en':
      return 'english';
    case 'hi':
      return 'hindi';
    case 'te':
      return 'telugu';
    default:
      throw new Error('Locale not recognized');
  }
}


export default languages;
