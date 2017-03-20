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
    previewItems: state.preview,
    parsedParams: {
      bankId,
      assessmentId
    }
  };
}

export class PreviewAssessment extends React.Component {
  static propTypes = {
    params: React.PropTypes.object.isRequired,
    assessment: React.PropTypes.object.isRequired,
    settings: React.PropTypes.object.isRequired,
    getAssessmentOffered: React.PropTypes.func.isRequired,
    getAssessments: React.PropTypes.func.isRequired,
    getAssessmentItems: React.PropTypes.func.isRequired,
    parsedParams: React.PropTypes.object.isRequired,
  };

  componentDidMount() {
    if (_.isEmpty(this.props.assessment)) {
      this.props.getAssessments(this.props.parsedParams.bankId);
      this.props.getAssessmentItems(
        this.props.parsedParams.bankId,
        this.props.parsedParams.assessmentId
      );
    }
  }

  render() {
    if (_.isEmpty(this.props.assessment)) {
      return <div className='not-loaded'>Assessments are not loaded!</div>;
    }

    return (
      <PreviewContainer
        assessment={this.props.assessment}
        assessmentPlayerUrl={this.props.settings.assessmentPlayerUrl}
        apiUrl={this.props.settings.api_url}
        getAssessmentOffered={this.props.getAssessmentOffered}
        authoringToolSettings={this.props.settings.authoring_tool_settings}
      />
    );
  }
}

export default connect(select, { ...AssessmentActions })(PreviewAssessment);
