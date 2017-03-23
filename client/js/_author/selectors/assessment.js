import _ from 'lodash';
import { createSelector }  from 'reselect';

export const bankId = (state, props) => encodeURIComponent(props.params.bankId);
export const id = (state, props) => encodeURIComponent(props.params.id);
export const allItems = state => state.items;
export const assessmentItems = state => state.assessmentItems;
export const settings = state => state.settings;
export const banks = state => state.banks;

export function transformAssessment(assessment, items = []) {
  if (!assessment) return {};
  const fixedAssessment = {
    ...assessment,
    name: assessment.displayName.text,
    items
  };

  return fixedAssessment;
}


export const bankAssessments = createSelector(
  bankId,
  state => state.assessments,
  (bankId, assessments) => assessments[bankId],
);

export const assessmentItemIds = createSelector(
  assessmentItems,
  id,
  (assessmentItems, id) => assessmentItems[id],
);

export const items = createSelector(
  allItems,
  bankId,
  assessmentItemIds,
  (items, bankId, assessmentItemIds) => _.compact(_.at(items[bankId], assessmentItemIds))
);

export const assessment = createSelector(
  bankAssessments,
  id,
  items,
  (bankAssessments, id, items) => (
    bankAssessments && transformAssessment(bankAssessments[id], items)
  ) || {}
);

export const isPublished = createSelector(
  assessment,
  settings,
  (assessment, settings) => _.includes(
    assessment.assignedBankIds,
    settings.publishedBankId,
  )
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
