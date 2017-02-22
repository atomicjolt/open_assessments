import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import * as AssessmentActions from '../../../actions/qbank/assessments';
import { transformAssessment } from '../../selectors/assessment';
import PreviewContainer from './preview_container';

function select(state, props) {
  return {
    assessment: transformAssessment(props.assessment),
    settings: state.settings,
  };
}

export class AssessmentPreview extends React.Component {
  static propTypes = {
    assessment: React.PropTypes.object,
    getAssessmentOffered: React.PropTypes.func,
    settings: React.PropTypes.object
  }

  componentWillMount() {
    if (!this.hasAssessmentOffered() && this.props.assessment) {
      this.getEmbedCode(this.props.assessment);
    }
  }

  getEmbedCode(assessment) {
    const assessOffered = _.get(assessment, 'assessmentOffered[0]', '');
    if (_.isEmpty(assessOffered)) {
      this.props.getAssessmentOffered(assessment.bankId, assessment.id);
    }
  }

  hasAssessmentOffered() {
    return !_.isUndefined(_.get(this.props, 'assessment.assessmentOffered'));
  }

  render() {
    // if (!this.props.assessment) return null;
    return <PreviewContainer />;
    // if (this.hasAssessmentOffered()) {
    //   const bankId = this.props.assessment.bankId;
    //   const assessmentId = this.props.assessment.id;
    //   const baseEmbedUrl = this.props.settings.baseEmbedUrl;
    //   const embedUrlCode = `${baseEmbedUrl}${bankId}&assessment_offered_id=${assessmentId}#/assessment`;
    //
    //   return <iframe src={embedUrlCode} />;
    // }
    // return null;
  }
}

export default connect(select, {
  ...AssessmentActions,
})(AssessmentPreview);
