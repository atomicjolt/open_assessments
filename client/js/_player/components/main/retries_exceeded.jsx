import React            from 'react';
import { connect }      from 'react-redux';

import localizeStrings  from '../../selectors/localize';

const select = (state, props) => {
  return {
    // User facing strings of the language specified by the 'locale' setting
    localizedStrings: localizeStrings(state, props)
  };
};

export class RetriesExceeded extends React.Component {
  render() {
    const strings = this.props.localizedStrings;
    return <div>{strings.retriesExceeded.triesExceeded}</div>;
  }
}

export default connect(select)(RetriesExceeded);
