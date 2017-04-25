import React     from 'react';
import Recorder, { RecorderCommands }  from './recorder';

class AudioUpload extends React.Component {

  static propTypes = {
    selectAnswer: React.PropTypes.func,

    // User facing strings of the language specified by the 'locale' setting
    localizedStrings: React.PropTypes.object.isRequired,

    // Maximum audio recording length in seconds
    timeout: React.PropTypes.number,

    // Actions to call when recording is started or stopped
    audioRecordStart: React.PropTypes.func.isRequired,
    audioRecordStop: React.PropTypes.func.isRequired
  };

  constructor(){
    super();
    this.state = {
      recorder: RecorderCommands.stop,
      audioURL:"",
      timeoutId: null
    };
  }

  onStop(blob, stopTime){
    // Do something with the blob file of the recording
    var audioURL = window.URL.createObjectURL(blob);
    this.setState({audioURL});
    if(_.isFunction(this.props.selectAnswer)){this.props.selectAnswer(blob);}
    this.props.audioRecordStop(stopTime);
  }

  toggle(){
    if(this.state.recorder === RecorderCommands.stop){
      var timeoutId = window.setTimeout(() => {
        this.setState({
          recorder: RecorderCommands.stop,
          timeoutId: null
        });
      }, this.props.timeout * 1000); // Convert seconds to milliseconds
      this.props.audioRecordStart();
      this.setState({
        recorder: RecorderCommands.start,
        timeoutId
      });
    } else if(this.state.recorder === RecorderCommands.start) {
      window.clearTimeout(this.state.timeoutId);
      this.setState({
        recorder:RecorderCommands.stop,
        timeoutId: null
      });
    }
  }

  componentWillUnmount(){
    if(this.state.timeoutId){
      window.clearTimeout(this.state.timeoutId);
    }
  }

  render(){
    if(this.state.recorder == RecorderCommands.start){
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
        <Recorder
          command={this.state.recorder}
          onStop={(blob, stopTime) => this.onStop(blob, stopTime)} />
      </div>
    );
  }
};

export default AudioUpload;
