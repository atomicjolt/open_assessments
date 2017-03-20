import React from 'react';
import _ from 'lodash';

export default class PreviewContainer extends React.Component {
  static propTypes = {
    assessment: React.PropTypes.object.isRequired,
    getAssessmentOffered: React.PropTypes.func.isRequired,
    assessmentPlayerUrl: React.PropTypes.string.isRequired,
    apiUrl: React.PropTypes.string.isRequired,
    authoringToolPreviewSettings: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  };

  static hasOffered(assessment) {
    return !(_.isUndefined(assessment.assessmentOffered)
      || _.isEmpty(assessment.assessmentOffered[0]));
  }

  static buildEmbedUrl(props) {
    const { assessmentPlayerUrl, apiUrl, assessment } = props;

    const bankId = assessment.bankId;
    const assessmentOfferedId = _.get(assessment, 'assessmentOffered[0].id');
    const previewSettings = _.get(props, 'authoringToolPreviewSettings', []).join('&');

    return `${assessmentPlayerUrl}?${previewSettings}&api_url=${apiUrl}&bank=${bankId}&assessment_offered_id=${assessmentOfferedId}#/assessment`;
  }


  componentDidMount() {
    const assessment = this.props.assessment;
    if (!PreviewContainer.hasOffered(assessment)) {
      this.props.getAssessmentOffered(assessment.bankId, assessment.id);
    }
  }

  render() {
    if (PreviewContainer.hasOffered(this.props.assessment)) {
      return (
        <iframe height="10000" width="100%" src={PreviewContainer.buildEmbedUrl(this.props)} />
      );
    }
    return null;
  }
}
