import { createSelector } from 'reselect';
import { Assessment as Qti1Assessment } from '../parsers/qti1';

function getObject(metaData){
  return {
    "QTI1": Qti1Assessment,
    "QTI2": Qti2Assessment,
    "EDX": EdxAssessment
  }[metaData.type];
}

function makeSelector(name){
  return getObject(state.assessmentMetaData)[name];
}

export const getItems = makeSelector("getItems");
export const perSecItems = makeSelector("perSecItems");
export const questionCount = makeSelector("questionCount");
export const outcomes = makeSelector("outcomes");