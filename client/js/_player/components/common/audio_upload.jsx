import React     from 'react';
import _ from 'lodash';
import Recorder, { RecorderCommands }  from './recorder';
import RecorderTimer from './recorder_timer';

class AudioUpload extends React.Component {

  static propTypes = {
    selectAnswer: React.PropTypes.func,

    // User facing strings of the language specified by the 'locale' setting
    localizedStrings: React.PropTypes.object.isRequired,

    // Maximum audio recording length in seconds
    audioTimeout: React.PropTypes.number,

    // Saved response to be displayed
    savedResponse: React.PropTypes.string,

    // Actions to call when recording is started or stopped
    audioRecordStart: React.PropTypes.func.isRequired,
    audioRecordStop : React.PropTypes.func.isRequired,

    // Whether or not input should be disabled
    isDisabled: React.PropTypes.bool
  };

  constructor() {
    super();
    this.state = {
      recorder : RecorderCommands.stop,
      audioURL : '',
      timeoutId: null
    };
  }

  componentWillUnmount() {
    if (this.state.timeoutId) {
      window.clearTimeout(this.state.timeoutId);
    }
  }

  onStop(blob, stopTime) {
    // Do something with the blob file of the recording
    const audioURL = window.URL.createObjectURL(blob);
    this.setState({ audioURL });
    if (_.isFunction(this.props.selectAnswer)) { this.props.selectAnswer(blob); }
    this.props.audioRecordStop(stopTime);
  }

  toggle() {
    if (this.state.recorder === RecorderCommands.stop) {
      const timeoutId = window.setTimeout(() => {
        this.setState({
          recorder : RecorderCommands.stop,
          timeoutId: null
        });
      }, this.props.audioTimeout * 1000); // Convert seconds to milliseconds
      this.props.audioRecordStart();
      this.setState({
        recorder: RecorderCommands.start,
        timeoutId
      });
    } else if (this.state.recorder === RecorderCommands.start) {
      window.clearTimeout(this.state.timeoutId);
      this.setState({
        recorder :RecorderCommands.stop,
        timeoutId: null
      });
    }
  }

  render() {
    let audioEl; // handle toggling between viewing Recorder Timer and audio element
    let buttonText;
    let buttonClass;
    let hideButClass;

    if (this.state.recorder === RecorderCommands.start) {
      buttonClass = 'c-btn--stop';
      buttonText = this.props.localizedStrings.stop;
      audioEl = (
        <RecorderTimer
          localizedStrings={this.props.localizedStrings}
          audioTimeout={this.props.audioTimeout}
        />);  // show Recorder Timer
    } else {
      buttonText = this.props.localizedStrings.record;
      audioEl = <audio src={this.props.savedResponse || this.state.audioURL} type="audio/wav" controls />; // show audio element
    }
    if (this.props.isDisabled) {
      hideButClass = 'c-btn--subdue';
    }
    return (
      <div className="c-record">
        <button
          onClick={() => { this.toggle(); }}
          className={`c-btn  c-btn--record ${buttonClass || ''} ${hideButClass || ''}`}
          disabled={this.props.isDisabled}
        >
          <span>{ buttonText }</span>
        </button>
        <span className="c-audio-holder">{audioEl}</span>
        <Recorder
          command={this.state.recorder}
          onStop={(blob, stopTime) => this.onStop(blob, stopTime)}
        />
      </div>
    );
  }
}

export default AudioUpload;
