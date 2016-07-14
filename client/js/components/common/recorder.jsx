import React     from 'react';
import Record    from '../../libs/recorder';

export default class Recorder extends React.Component{

  static propTypes = {

  };

  constructor(){
    super();
    this.state = {};
  }

  startRecorder(){
    var _this = this;
    if(this.state.recorder && !this.state.recorder.recording){
      this.state.recorder.record();
    } else {
      navigator.getUserMedia = (
          navigator.getUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia ||
          navigator.webkitGetUserMedia
         );
      if (navigator.getUserMedia) {
        navigator.getUserMedia({ audio: true, video: false },
          function(stream) {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            var context = new AudioContext(); //TODO only one audio context
            var input = context.createMediaStreamSource(stream);
            var recorder = new Record(input);
            _this.setState({recorder});
            recorder.record();
          },
          function(err) {
            console.log("The following error occurred: " + err.name);
          }
       );
      } else {
        console.log("getUserMedia not supported");
      }
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
