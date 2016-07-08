import React            from 'react';
import { connect }      from 'react-redux';

const select = (state, props) => {
  return {
    assessmentProgress: state.assessmentProgress.toJS(),
    items: state.assessment.items
  }
}

export class AssessmentComplete extends React.Component{
  render() {
    const correctQuestions = _.filter(this.props.assessmentProgress.responses,
    (response, index) => {
      return _.get(this.props.assessmentProgress, `checkedResponses[${index}][${response}]`);
    });

    return <div style={{textAlign: "center", padding: "100px"}}>
      <h1>Quiz Complete</h1>
    </div>
  }
}

export default connect(select, {})(AssessmentComplete);
