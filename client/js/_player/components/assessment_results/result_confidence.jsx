"use strict";

import React          from 'react';

export default class ResultConfidence extends React.Component{

  static propTypes = {
    level: React.PropTypes.string.isRequired
  }

  render() {

    return (
      <div >
        <h5 tabIndex="0" aria-label={"Your confidence level was " + this.props.level}>Your confidence level</h5>
        <div>
          <div>Just A Guess</div>
          <div>Pretty Sure</div>
          <div>Very Sure</div>
        </div>
      </div>

    );
  }

}