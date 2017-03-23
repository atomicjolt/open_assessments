import _ from 'lodash';
import { createSelector }  from 'reselect';

export function transformAssessment(assessment) {
  if (!assessment) return {};
  const fixedAssessment = {
    ...assessment,
    name: assessment.displayName.text,
  };

  return fixedAssessment;
}

export function isPublished(assessment, settings) {
  return _.includes(assessment.assignedBankIds, settings.publishedBankId);
}

// export function editOrPublishAssessment(assessment, settings, isPublished) {
//   if (isPublished) {
//     this.props.deleteAssignedAssessment(assessment, settings.publishedBankId);
//     this.props.editOrPublishAssessment(assessment, settings.editableBankId);
//   } else {
//     if (_.includes(assessment.assignedBankIds, this.props.settings.editableBankId)) {
//       this.props.deleteAssignedAssessment(assessment, settings.editableBankId);
//     }
//     if (_.isEmpty(assessment.assessmentOffered) && !_.isEmpty(this.props.items)) {
//       this.props.createAssessmentOffered(assessment.bankId, assessment.id);
//     }
//     this.props.editOrPublishAssessment(assessment, settings.publishedBankId);
//   }
// }
