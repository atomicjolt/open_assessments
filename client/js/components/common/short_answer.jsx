"use strict";

import React from 'react';

export default class TextArea extends React.Component{
  static propTypes = {
    selectAnswer: React.PropTypes.func.isRequired,
  };

  constructor(){
    super();
    this.state = {input:""};
  }

  handleChange(e){
    this.setState({input:e.target.value});
  }

  render(){
    return(
  			<textarea
          rows="1"
          onBlur={() => this.props.selectAnswer(this.state.input)}
          onChange={(e) => this.handleChange(e)} />
  	);
  }
}
