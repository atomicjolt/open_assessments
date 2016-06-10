import { createSelector } from 'reselect';

export const items = (state) => {
  if(state.assessment.standard == "qti"){
    return Assessment.getItems(state.assessment.sections);
  } else {
    return state.assessment.sections[_sectionIndex].items;
  }
};

export const perSecItems = (state) => {
  const allItems = items(state);
  //state.settings.perSec
};

export const questionCount = (state) => {
  const allItems = items(state);
  if(_items && _items.length > 0){
    return _items.length;
  }
  return SettingsStore.current().sectionCount * SettingsStore.current().perSec;
  return state.assessment ;
};

export const allQuestions = (state) => {
  return state.assessment ;
};

export const outcomes = (state) => {
  return state.assessment ;
};