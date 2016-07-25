import React     from "react";
import Recorder  from "./recorder";

class AudioUpload extends React.Component {

  static propTypes = {
    selectAnswer: React.PropTypes.func,
  };

  constructor(){
    super();
    this.state = {
      recorder: "stop",
      audioURL:""
    };
  }

  onStop(blob){
    // Do something with the blob file of the recording
    var audioURL = window.URL.createObjectURL(blob);
    this.setState({audioURL});
    if(this.props.selectAnswer){this.props.selectAnswer(blob);}
  }

  toggle(){
    if(this.state.recorder === "stop"){
      this.setState({recorder:"start"});
    } else if(this.state.recorder === "start") {
      this.setState({recorder:"stop"});
    }
  }

  render(){
    return (
      <div>
        <Recorder command={this.state.recorder} onStop={(blob) => this.onStop(blob)} />
        <button onClick={() => this.toggle()}>Recorder</button>
        <audio src={this.state.audioURL} controls/>
      </div>
    );
  }
};

export default AudioUpload;
