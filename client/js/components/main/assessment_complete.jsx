import React            from 'react';
import { connect }      from 'react-redux';

import { localizeStrings }  from '../../selectors/localize';

const select = (state, props) => {
  return {
    assessmentProgress: state.assessmentProgress.toJS(),
    items: state.assessment.items,
    
    // User facing strings of the language specified by the 'locale' setting
    localizedStrings: localizeStrings(state, props)
  }
}

export class AssessmentComplete extends React.Component{
  render() {
    const correctQuestions = _.filter(this.props.assessmentProgress.responses,
    (response, index) => {
      return _.get(this.props.assessmentProgress, `checkedResponses[${index}][${response}]`);
    });

    return <div style={{textAlign: "center", padding: "100px"}}>
      <h1>{this.props.localizedStrings.assessmentComplete.complete}</h1>
    </div>;
  }
}

export default connect(select, {})(AssessmentComplete);
