
export const languages = {
  english: '639-2%3AENG%40ISO',
  hindi: '639-2%3AHIN%40ISO',
  telugu: '639-2%3ATEL%40ISO',
};

export function getLanguage(langCode) {
  return _.findKey(languages, language => langCode === language) || null;
}


export default languages;
