import React            from 'react';
import { connect }      from 'react-redux';

import localizeStrings  from '../../selectors/localize';

const select = (state, props) => {
  return {
    // User facing strings of the language specified by the 'locale' setting
    localizedStrings: localizeStrings(state, props)
  };
};

export class AssessmentComplete extends React.Component {
  render() {
    return (
      <div className="assessment-complete">
        <h1>{this.props.localizedStrings.assessmentComplete.complete}</h1>
      </div>
    );
  }
}

export default connect(select, {})(AssessmentComplete);
