
export const languages = {
  english: '639-2%3AENG%40ISO',
};

export function getLanguage(langCode) {
  switch (langCode) {
    case languages.english:
      return 'english';

    default:
      return null;
  }
}


export default languages;
