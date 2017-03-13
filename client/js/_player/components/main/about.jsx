import React                 from 'react';
import { connect }           from 'react-redux';

import localizeStrings       from '../../selectors/localize';

const select = (state, props) => {
  return {
    // user facing strings of the language specified by the 'locale' setting
    localizedStrings: localizeStrings(state, props)
  };
};

export class About extends React.Component {

  static propTypes = {
    localizedStrings: React.PropTypes.object.isRequired,
  }

  render() {
    const strings = this.props.localizedStrings;
    return (
      <div>
        <h2>{strings.about.title}</h2>
      </div>
    );
  }
}

export default connect(select)(About);
