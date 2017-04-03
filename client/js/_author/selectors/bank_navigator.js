import _ from 'lodash';
import { createSelector }  from 'reselect';
import * as common from './common';
import { _assessment } from './assessment';

export const path = state => state.bankNavigation.location;


export const currentBankId = createSelector(
  path,
  (_path) => {
    if (!_.isEmpty(_path)) return _.last(_path).id;
    return null;
  }
);

export const rawAssessments = createSelector(
  common.assessments,
  currentBankId,
  (_rawAssessments, _currentBankId) => _.get(_rawAssessments, _currentBankId, {})
);

export const bankAssessments = createSelector(
rawAssessments,
common.settings,
(_rawAssessments, _settings) => {
  const transformedAssessments =
    _.map(_rawAssessments, assessment => _assessment(assessment, [], _settings));
  const assessmentHash = _.reduce(
    transformedAssessments,
    (assessments, assessment) => {
      assessments[assessment.id] = assessment;
      return assessments;
    }, {});
  return assessmentHash;
});


export const banks = createSelector(
  path,
  state => state.banks,
  (_path, _banks) => {
    // This is what makes bank navigation work
    let currentBanks = _banks;
    _.forEach(_path, (folder) => {
      const currentBank = _.find(currentBanks, { id: folder.id });
      currentBanks = currentBank.childNodes;
    });
    return _.merge(currentBanks);
  });

export const banksLoaded = createSelector(
  state => state.banks,
  _banks => !_.isEmpty(_banks)
);
