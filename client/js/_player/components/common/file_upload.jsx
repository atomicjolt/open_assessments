import React from "react";
import _     from 'lodash';

export default class FileUpload extends React.Component {

  static propTypes = {
    selectAnswer: React.PropTypes.func,

    // User facing strings of the language specified by the 'locale' setting
    localizedStrings: React.PropTypes.object.isRequired //TODO when we add styles, we should localize strings
  };

  handleChange(e){
    if(_.isFunction(this.props.selectAnswer)){
      // We are currently only allowing a single file upload. Without enabling
      // multiple uploads on the file input, the file list will only be of size 1
      // and will get replaced every time the file is updated.
      this.props.selectAnswer(e.target.files[0]);
    }
  }

  render(){
    return (
      <label className="c-file-upload">
        <input onChange={(e) => this.handleChange(e)} type="file"/>
        <span>{this.props.localizedStrings.chooseFile}</span>
      </label>
    );
  }
};
