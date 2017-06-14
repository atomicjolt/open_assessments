import React from 'react';
import _ from 'lodash';

export default class PreviewContainer extends React.Component {
  static propTypes = {
    assessment: React.PropTypes.object.isRequired,
    getAssessmentOffered: React.PropTypes.func.isRequired,
    assessmentPlayerUrl: React.PropTypes.string.isRequired,
    apiUrl: React.PropTypes.string.isRequired,
    unlockNext: React.PropTypes.string.isRequired,
  };

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
    const { assessmentPlayerUrl, apiUrl, assessment, unlockNext } = this.props;

    const bankId = assessment.bankId;
    const assessmentOffered = _.get(assessment, 'assessmentOffered[0]');
    const assessmentOfferedId = assessmentOffered.id;
    const settings = [`unlock_next=${unlockNext}`];

    if (assessmentOffered.unlockPrevious) {
      switch (assessmentOffered.unlockPrevious) {
        case 'ALWAYS':
          settings.push('unlock_prev=ALWAYS');
          break;

        case 'NEVER':
          settings.push('unlock_prev=NEVER');
          break;

        default:
          break;
      }

    }

    const previewSettings = settings.join('&');

    return `${assessmentPlayerUrl}?${previewSettings}&api_url=${apiUrl}&bank=${bankId}&assessment_offered_id=${assessmentOfferedId}#/assessment`;
  }

  render() {
    if (PreviewContainer.hasOffered(this.props.assessment)) {
      return (
        <iframe height="10000" width="100%" src={this.buildEmbedUrl()} />
      );
    }
    return null;
  }
}
