import React     from 'react';
import Record    from '../../libs/recorder';

export default class Recorder extends React.Component{

  static propTypes = {

  };

  constructor(){
    super();
    this.state = {};
  }

  gUMPolyfill(constraints) {
    // First get ahold of getUserMedia, if present
    var getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia);

    // Some browsers just don't implement it - return a rejected promise with an error
    // to keep a consistent interface
    if(!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }

    // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
    return new Promise(function(resolve, reject) {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  }

  startRecorder(){
    var _this = this;
    if(this.state.recorder && !this.state.recorder.recording){
      this.state.recorder.record();
    } else {


      // Older browsers might not implement mediaDevices at all, so we set an empty object first
      if(navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }

      // Some browsers partially implement mediaDevices. We can't just assign an object
      // with getUserMedia as it would overwrite existing properties.
      // Here, we will just add the getUserMedia property if it's missing.
      if(navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = this.gUMPolyfill;
      }

      navigator.mediaDevices.getUserMedia({audio:true})
      .then(function(stream) {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        var context = new AudioContext();
        var input = context.createMediaStreamSource(stream);
        var recorder = new Record(input);
        _this.setState({recorder});
        recorder.record();
      })
      .catch(function(err) {
        console.error(err);
      });
    }
  }

  stopRecorder(){
    if(this.state.recorder && this.state.recorder.recording){
      var _this = this;
      this.state.recorder.stop();
      this.state.recorder.exportWAV(
        (blob) => {
          this.props.onStop(blob);
          _this.state.recorder.clear();
        }
      );
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
