import React     from "react";
import Recorder  from "./recorder";

class AudioUpload extends React.Component {

  constructor(){
    super();
    this.state = {
      recorder: "stop",
      audioURL:""
    };
  }

  onStop(blob){
    // Do something with the blob file of the recording
    console.log("Recorder stopped");
    console.log(blob);
    // var audioURL = window.URL.createObjectURL(blob);
    this.setState({audioURL: window.URL.createObjectURL(blob)});
  }

  toggle(){
    if(this.state.recorder === "stop"){
      this.setState({recorder:"start"});
      console.log("Start recorder");
    } else if(this.state.recorder === "start") {
      this.setState({recorder:"stop"});
      console.log("Stop recorder");
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
