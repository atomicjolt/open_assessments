"use strict";

import React from 'react';

export default class TextArea extends React.Component{
  static propTypes = {
    selectAnswer: React.PropTypes.func.isRequired,
    rows: React.PropTypes.number,
    cols: React.PropTypes.number
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
          type="text"
          rows={this.props.rows || 1}
          cols={this.props.cols || 72}
          onBlur={() => this.props.selectAnswer(this.state.input)}
          onChange={(e) => this.handleChange(e)} />
  	);
  }
}
