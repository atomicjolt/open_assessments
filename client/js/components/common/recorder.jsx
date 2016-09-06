import React     from 'react';
import Record    from 'recorderjs';

export const RecorderCommands = {
  start: "start",
  stop: "stop"
};

export default class Recorder extends React.Component{

  static propTypes = {
    // Whether the recorder should start recording or stop recording.
    // Should be one of 'start' or 'stop'
    command: React.PropTypes.string.isRequired,

    // function called when recorder stops. Should have signature function(blob){}
    onStop: React.PropTypes.func.isRequired,
  };

  constructor(){
    super();
    this.state = {};
  }

  /**
   * Polyfill for browswers that don't support navigator.mediaDevices.getUserMedia
   */
  gUMPolyfill(constraints) {
    // First get ahold of getUserMedia, if present
    var getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia);

    // Some browsers just don't implement it - return a rejected promise with
    // an error to keep a consistent interface
    if(!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }

    // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
    return new Promise(function(resolve, reject) {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  }

  startRecorder(){
    if(!this.state.recorder){
      // Older browsers might not implement mediaDevices at all, so we set
      // an empty object first
      if(navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }

      // Some browsers partially implement mediaDevices. We can't just assign
      // an object with getUserMedia as it would overwrite existing properties.
      // Here, we will just add the getUserMedia property if it's missing.
      if(navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = this.gUMPolyfill;
      }

      navigator.mediaDevices.getUserMedia({audio:true})
      .then((stream) => this.handleStream(stream))
      .catch(function(err) {
        console.error(err);
      });
    }
  }

  handleStream(stream) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext = new AudioContext();
    var input = audioContext.createMediaStreamSource(stream);
    var recorder = new Record(input);
    this.setState({audioContext, recorder, stream});
    recorder.record();
  }

  /**
   * Free system audio resources
   */
  cleanupAudioResources(){
    this.state.recorder.clear();

    // Older browsers don't support audioContext.close()
    if(this.state.audioContext.close){this.state.audioContext.close();}

    if(this.state.stream.stop){
      // Older browsers stop recording by calling stop on the stream
      this.state.stream.stop();
    } else {
      // Newer browswers require stopping each track
      this.state.stream.getAudioTracks().forEach((t) => t.stop());
    }
  }

  stopRecorder(){
    if(this.state.recorder && this.state.recorder.recording){
      this.state.recorder.stop();
      this.state.recorder.exportWAV(
        (blob) => {
          this.props.onStop(blob, this.state.audioContext.currentTime);
          this.cleanupAudioResources();
          this.setState({recorder:null, audioContext:null, stream:null});
        }
      );
    }
  }

  componentWillUnmount(){
    if(this.state.recorder && this.state.recorder.recording){
      this.state.recorder.stop();
      this.cleanupAudioResources();
    }
  }

  render(){
    if(this.props.command == 'start'){
      this.startRecorder();
    } else if(this.props.command == 'stop') {
      this.stopRecorder();
    }

    return null;
  }

};
