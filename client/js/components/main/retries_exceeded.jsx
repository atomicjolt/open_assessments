import React            from 'react';
import { connect }      from "react-redux";

import { localizeStrings }  from '../../selectors/localize';

const select = (state, props) => {
  return {
    //TODO document
    localizedStrings: localizeStrings(state, props)
  };
};

export class RetriesExceeded extends React.Component{
  render() {
    var strings = this.props.localizedStrings;
    return <div>{strings.retriesExceeded.triesExceeded}</div>;
  }
}

export default connect(select)(RetriesExceeded);
