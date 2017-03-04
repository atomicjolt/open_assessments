import React from 'react';
import _ from 'lodash';

export default class PreviewContainer extends React.Component {
  static propTypes = {
    assessment: React.PropTypes.object.isRequired,
    getAssessmentOffered: React.PropTypes.func.isRequired,
    assessmentPlayerUrl: React.PropTypes.string.isRequired,
    apiUrl: React.PropTypes.string.isRequired,
  }

  static hasOffered(assessment) {
    return !(_.isUndefined(assessment.assessmentOffered)
      || _.isEmpty(assessment.assessmentOffered[0]));
  }

  componentDidMount() {
    const assessment = this.props.assessment;
    if (!PreviewContainer.hasOffered(assessment)) {
      this.props.getAssessmentOffered(assessment.bankId, assessment.id);
    }
  }

  buildEmbedUrl() {
    const { assessmentPlayerUrl, apiUrl, assessment } = this.props;

    const bankId = assessment.bankId;
    const assessmentOfferedId = _.get(assessment, 'assessmentOffered[0].id');
    return `${assessmentPlayerUrl}?unlock_next=ALWAYS&api_url=${apiUrl}&bank=${bankId}&assessment_offered_id=${assessmentOfferedId}#/assessment`;
  }

  render() {
    if (PreviewContainer.hasOffered(this.props.assessment)) {
      return (
        <iframe height="1000" width="1000" src={this.buildEmbedUrl()} />
      );
    }
    return null;
  }
}
