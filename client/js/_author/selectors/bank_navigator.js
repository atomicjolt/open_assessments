import _ from 'lodash';
import { createSelector }  from 'reselect';
import * as common from './common';

export const path = state => state.bankNavigation.location;


export const currentBankId = createSelector(
  path,
  _path => _.get(_path, 'id', null)
);

export const currentBank = createSelector(
  common.assessments,
  currentBankId,
  (_assessments, _currentBankId) => _assessments[_currentBankId]
);


export const banks = createSelector(
  path,
  state => state.banks,
  (_path, _banks) => {
    let currentBanks = _banks;
    _.forEach(_path, (folder) => {
      const currentBank = _.find(_banks, { id: folder.id });
      currentBanks = currentBank.childNodes;
    });
    return _.merge(currentBanks);
  });
