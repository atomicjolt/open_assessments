import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import * as AssessmentActions from '../../../actions/qbank/assessments';
import { transformAssessment } from '../../selectors/assessment';
import PreviewContainer from './preview_container';
import NavigationBar from  './navigation_bar';

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
    assessment: React.PropTypes.object.isRequired,
    settings: React.PropTypes.shape({
      assessmentPlayerUrl: React.PropTypes.string.isRequired,
      api_url: React.PropTypes.string.isRequired,
      unlock_next: React.PropTypes.string.isRequired,
    }).isRequired,
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
      return <div className="not-loaded">Loading Preview...</div>;
    }

    return (
      <div>
        <NavigationBar />
        <PreviewContainer
          assessment={this.props.assessment}
          assessmentPlayerUrl={this.props.settings.assessmentPlayerUrl}
          apiUrl={this.props.settings.api_url}
          getAssessmentOffered={this.props.getAssessmentOffered}
          unlockNext={this.props.settings.unlock_next}
        />
      </div>
    );
  }
}

export default connect(select, { ...AssessmentActions })(PreviewAssessment);
