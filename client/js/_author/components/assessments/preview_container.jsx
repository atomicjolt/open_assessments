import React from 'react';
import _ from 'lodash';

export default class PreviewContainer extends React.Component {
  static propTypes = {
    assessment: React.PropTypes.object.isRequired,
    getAssessmentOffered: React.PropTypes.func.isRequired,
    assessmentPlayerUrl: React.PropTypes.string.isRequired,
    apiUrl: React.PropTypes.string.isRequired,
  }

  componentDidMount() {
    const assessment = this.props.assessment;
    if (assessment.assessmentOffered && _.isEmpty(assessment.assessmentOffered[0])) {
      this.props.getAssessmentOffered(assessment.bankId, assessment.id);
    }
  }

  buildEmbedUrl() {
    const { assessmentPlayerUrl, apiUrl, assessment } = this.props;
    const bankId = encodeURIComponent(assessment.bankId);
    const assessmentId = encodeURIComponent(assessment.id);
    return `${assessmentPlayerUrl}?unlock_next=ON_CORRECT&api_url=${apiUrl}&bank=${bankId}&assessment_offered_id=${assessmentId}#/assessment`;
  }

  render() {
    return (
      <iframe height="1000" width="1000" src={this.buildEmbedUrl()} />
    );
  }
}
