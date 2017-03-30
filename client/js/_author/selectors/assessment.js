import _ from 'lodash';
import { createSelector }  from 'reselect';

export const bankId = (state, props) => encodeURIComponent(props.params.bankId);
export const id = (state, props) => encodeURIComponent(props.params.id);
export const allItems = state => state.items;
export const assessmentItems = state => state.assessmentItems;
export const settings = state => state.settings;
export const banks = state => state.banks;

export function transformAssessment(assessment, items = [], published) {
  if (!assessment) return {};
  const fixedAssessment = {
    ...assessment,
    name: _.get(assessment, 'displayName.text', ''),
    items,
    isPublished: published,
  };

  return fixedAssessment;
}


export const bankAssessments = createSelector(
  bankId,
  state => state.assessments,
  (_bankId, _assessments) => _assessments[_bankId],
);

export const assessmentItemIds = createSelector(
  assessmentItems,
  id,
  (_assessmentItems, _id) => _assessmentItems[_id],
);

export const items = createSelector(
  allItems,
  bankId,
  assessmentItemIds,
  (_items, _bankId, _assessmentItemIds) => _.compact(_.at(_items[_bankId], _assessmentItemIds))
);

const _isPublished = (_assessment = {}, _settings = {}) =>
   _.includes(
      _assessment.assignedBankIds,
      _settings.publishedBankId,
  );

export const _assessment = (_rawAssessment, _items, _settings) => {
  const _published = _isPublished(_rawAssessment, _settings);
  return transformAssessment(_rawAssessment, _items, _published);
};

export const rawAssessment = createSelector(
  bankAssessments,
  id,
  (_bankAssessments, _id) => {
    if (_.isUndefined(_bankAssessments)) { return {}; }
    return _bankAssessments[_id];
  }
);

export const assessment = createSelector(
  rawAssessment,
  items,
  settings,
  (_rawAssessment, _items, _settings) => _assessment(_rawAssessment, _items, _settings)
);

export const isPublished = createSelector(
  assessment,
  settings,
  _isPublished,
);
