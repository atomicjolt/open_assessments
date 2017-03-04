import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import * as AssessmentActions from '../../../actions/qbank/assessments';
import { transformAssessment } from '../../selectors/assessment';
import PreviewContainer from './preview_container';

function select(state, props) {
  const bankId = encodeURIComponent(props.params.bankId);
  const assessmentId = encodeURIComponent(props.params.id);
  const assessment = _.get(state.assessments, [bankId, assessmentId]);

  return {
    assessment: transformAssessment(assessment),
    settings: state.settings,
    previewItems: state.preview
  };
}

export class PreviewAssessment extends React.Component {
  static propTypes = {
    params: React.PropTypes.object.isRequired,
    assessment: React.PropTypes.object.isRequired,
    settings: React.PropTypes.object.isRequired,
  }

  render() {
    return (
      <PreviewContainer
        assessment={this.props.assessment}
        assessmentPlayerUrl={this.props.settings.assessmentPlayerUrl}
        apiUrl={this.props.settings.api_url}
      />
    );
  }
}

export default connect(select, { ...AssessmentActions })(PreviewAssessment);
