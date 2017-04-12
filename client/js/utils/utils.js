import _ from 'lodash';

export const currentTime = () => new Date().getTime();

export const makeId = () => {
  var result, i, j;
  result = '';
  for(j=0; j<32; j++) {
    if( j == 8 || j == 12|| j == 16|| j == 20)
      result = result + '-';
    i = Math.floor(Math.random()*16).toString(16).toUpperCase();
    result = result + i;
  }
  return result;
};

export const htmlDecode = (input) => {
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
};

export const htmlDecodeWithRoot = (input) => {
  const result = htmlDecode(input);
  if(result && result.length > 0){
    return '<root>' + htmlDecode(input) + '</root>';
  } else {
    return null;
  }
};

export const getLocation = (href) => {
  var l = document.createElement("a");
  l.href = href;
  return l;
};

export const languageText = (texts, language) => {
  const chosenLanguage = _.find(texts, { languageTypeId: language });
  return _.get(chosenLanguage, 'text', '');
};
