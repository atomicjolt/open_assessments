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
    name: assessment.displayName.text,
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

const _isPublished = (_assessment, _settings) => _.includes(
  _assessment.assignedBankIds,
  _settings.publishedBankId,
);

export const assessment = createSelector(
  bankAssessments,
  id,
  items,
  settings,
  (_bankAssessments, _id, _items, _settings) => {
    if (_.isUndefined(_bankAssessments)) { return {}; }
    const _assessment = _bankAssessments[_id];
    const _published = _isPublished(_assessment, _settings);
    return transformAssessment(_assessment, _items, _published);
  }
);

export const isPublished = createSelector(
  assessment,
  settings,
  _isPublished,
);


export function togglePublishAssessment(assessment, settings) {
  const published = isPublished(assessment, settings);
  const shouldCreateOffered =
    _.isEmpty(assessment.assessmentOffered) && !_.isEmpty(items);
  const shouldDeleteAssessment =
    _.includes(assessment.assignedBankIds, settings.editableBankId);

  if (published) {
    this.props.deleteAssignedAssessment(assessment, settings.publishedBankId);
    this.props.editOrPublishAssessment(assessment, settings.editableBankId);
    return;
  }

  if (shouldDeleteAssessment) {
    this.props.deleteAssignedAssessment(assessment, settings.editableBankId);
  }
  if (shouldCreateOffered) {
    this.props.createAssessmentOffered(assessment.bankId, assessment.id);
  }
  this.props.editOrPublishAssessment(assessment, settings.publishedBankId);
}
