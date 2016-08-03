import React     from "react";

export default class FileUpload extends React.Component {

  static propTypes = {
    selectAnswer: React.PropTypes.func,

    // User facing strings of the language specified by the 'locale' setting
    localizedStrings: React.PropTypes.object.isRequired
  }

  handleChange(e){
    console.log(e.target.files); // TODO remove
    if(_.isFunction(this.props.selectAnswer)){
      this.props.selectAnswer(e.target.files[0]);
    }
  }

  render(){
    return (
      <input onChange={(e) => this.handleChange(e)} type="file" />
    );
  }
};
