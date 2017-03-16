import React from 'react';
import { Line } from 'rc-progress';

class RecorderTimer extends React.Component {
  static propTypes = {
    // User facing strings of the language specified by the 'locale' setting
    localizedStrings: React.PropTypes.object.isRequired,

    // Maximum audio recording length in seconds
    timeout: React.PropTypes.number,
  };

  constructor() {
    super();
    this.state = {
      minsCt       : 0,
      secsCt       : 0,
      secsStringCt : '00',
      prcntCt      : 0
    };
  }

  componentDidMount() {
    this.handleTimerCount();
  }

  componentWillUnmount() {
    this.clearTimerCount();
  }

  tick() {
    this.setState(prevState => ({
      prcntCt: Math.round(((prevState.prcntCt + 1) / this.props.timeout) * 100),
    }));

    if (this.state.secsCt < 9) {
      this.setState(prevState => ({
        secsCt       : prevState.secsCt + 1,
        secsStringCt : `0${prevState.secsCt + 1}`,
      }));
    } else if (this.state.secsCt === 59) {
      this.setState(prevState => ({
        minsCt       : prevState.minsCt + 1,
        secsCt       : 0,
        secsStringCt : '00',
      }));
    } else {
      this.setState(prevState => ({
        secsCt       : prevState.secsCt + 1,
        secsStringCt : prevState.secsCt + 1,
      }));
    }
  }

  handleTimerCount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  clearTimerCount() {
    clearInterval(this.interval);
    this.setState(
      {
        minsCt       : 0,
        secsCt       : 0,
        secsStringCt : '00',
        prcntCt      : 0,
      }
      );
  }

  render() {
    return (
      <div>
        <div className="c-audio-timer"><small>{this.props.localizedStrings.recordTime}</small> {this.state.minsCt}:{this.state.secsStringCt}</div>
        <Line percent={this.state.prcntCt} strokeWidth="1" strokeColor="#D0021B" />
      </div>
    );
  }
}

export default RecorderTimer;
