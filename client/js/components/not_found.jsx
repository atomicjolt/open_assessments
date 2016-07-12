"use strict";

import React            from 'react';
import { connect }           from "react-redux";

import { localizeStrings }   from '../selectors/localize';

const select = (state, props) => {
  return {
    //TODO document
    localizedStrings: localizeStrings(state, props)
  };
};

export class NotFound extends React.Component{
  render(){
    return <h2>{this.props.localizedStrings.notFound.notFound}</h2>;
  }
};

export default connect(select)(NotFound);
