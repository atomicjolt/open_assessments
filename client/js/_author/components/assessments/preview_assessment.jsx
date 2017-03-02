import React from 'react';
import { connect } from 'react-redux';

import * as AssessmentActions from '../../../actions/qbank/assessments';
import { transformAssessment } from '../../selectors/assessment';
import PreviewContainer from './preview_container';

function select(state, props) {
  return {
    assessment: transformAssessment(props.assessment),
    settings: state.settings,
    previewItems: state.preview
  };
}

export class PreviewAssessment extends React.Component {
  static propTypes = {
    params: React.PropTypes.object.isRequired,
    getAssessmentPreview: React.PropTypes.func.isRequired,
    previewItems: React.PropTypes.array.isRequired,
  }

  componentDidMount() {
    this.props.getAssessmentPreview(
      this.props.params.bankId,
      this.props.params.id,
    );
  }

  render() {
    return (
      <PreviewContainer
        previewItems={this.props.previewItems}
      />
    );
  }
}

export default connect(select, { ...AssessmentActions })(PreviewAssessment);
