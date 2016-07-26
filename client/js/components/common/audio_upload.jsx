import React     from "react";
import Recorder, { RecorderCommands}  from "./recorder";

class AudioUpload extends React.Component {

  static propTypes = {
    selectAnswer: React.PropTypes.func,

    // User facing strings of the language specified by the 'locale' setting
    localizedStrings: React.PropTypes.object.isRequired,

    timeout: React.PropTypes.number
  };

  constructor(){
    super();
    this.state = {
      recorder: RecorderCommands.stop,
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
    if(this.state.recorder === RecorderCommands.stop){
      this.setState({recorder: RecorderCommands.start});
      window.setTimeout(() => {
        this.setState({recorder: RecorderCommands.stop});
      }, this.props.timeout * 1000 || 1000000);
    } else if(this.state.recorder === RecorderCommands.start) {
      this.setState({recorder:RecorderCommands.stop});
    }
  }

  render(){
    if(this.state.recorder == RecorderCommands.start){ //TODO use RecorderCommands
      var buttonClass = "c-btn--stop";
      var buttonText = this.props.localizedStrings.stop;
    } else {
      var buttonText = this.props.localizedStrings.record;
    }
    return (
      <div className="c-record">
        <a
          onClick={() => {this.toggle();}}
          className={`c-btn  c-btn--record ${buttonClass || ''}`}>
            <span>{buttonText}</span>
        </a>
        <audio src={this.state.audioURL} type="audio/wav" controls />
        <Recorder command={this.state.recorder} onStop={(blob) => this.onStop(blob)} />
      </div>
    );
  }
};

export default AudioUpload;
